module.exports = function (app) {
	var User = app.models.users;
    var Fazenda = app.models.fazendas;

	var UserController = {
		edit: function (req, res) {
			User.findOne({_id : req.params.id}, function (err, user){
				res.render('users/edit', {
					title: "Editar",
					user: user,
					tags : req.tags
				});
			})
		},
		update: function (req, res) {
			var id = req.params.id;
			var password = crypter.hash(req.body.user.password);
			
			User.findOne({_id: id}, function (err, user){
				user.password = password;
				
				user.save(function (err){
					if (err) {
						req.flash('error', 'Operação não realizada');
						throw err
					}else{
						req.flash('success', 'Operação realizada com sucesso');
						res.redirect('/user/'+user._id);
					};
				});
			});
		},
		show: function (req, res) {
			var params = {};
			User.findOne({_id : req.params.id}, function(err, user){
				if (err) {
					throw err;
				}else{
					params = {
						user : user,
						tags : req.tags
					};
					res.render('users/show', params);
				};
			})
		},
        showAll: function (req, res) {
			var params = {};
			User.find({}).sort({'updateAt': -1}).exec(function(err, users){
				params = {
					users : users,
                    tags : req.tags
				};
				res.render('users/showAll', params);
			});
		},
		entrar : function (req, res) {
			res.render('users/session/entrar', {
				tags : req.tags
			});
		},
		cadastrar : function (req, res) {
            var params = {};
			Fazenda.find({}).sort({'updateAt': -1}).exec(function(err, fazendas){
				params = {
					fazendas : fazendas,
                    tags : req.tags
				};
				res.render('users/session/cadastrar', params);
			});
		},
		login : function (req, res) {
			var query = { email : req.body.user.email };
			var password = req.body.user.password;
			User.findOne(query)
				.select('name email password')
				.exec(function(err, user){
					if (user) {
						if (crypter.validate(user.password, password)) {
							req.session.user = user;
							req.flash('success', 'Operação realizada com sucesso');
							res.redirect('/')
						}else{
							req.flash('error', 'Senha incorreta');
							res.redirect('/entrar')
						}
					} else{
						req.flash('error', 'E-Mail incorreto');
						res.redirect('/entrar')
					};
				});
		},
		signup : function (req, res) {
			var query = req.body.user;
			query.password = crypter.hash(query.password);
			User.create(query, function (err, user) {
				if (err) {
					res.redirect('/cadastrar');
				} else {
					req.flash('success', 'Operação realizada com sucesso');
					req.session.user = user;
					res.redirect('/manejos');
				};
			});
		},
		logout : function (req, res) {
			req.session.destroy();
			res.redirect('/');
		}
	};

	return UserController;
}