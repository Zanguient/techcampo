module.exports = function (app) {
	var Animal = app.models.animais;
    var Fazenda = app.models.fazendas;
	var AnimalController = {
        
		edit: function (req, res) {
			Animal.findOne({_id : req.params.id}, function (err, animal){
				res.render('animais/edit', {
					title: "Editar",
					animal: animal
				});
			})
		},
		update: function (req, res) {
			var id = req.params.id;
			var name = req.body.animal.name;
			var email = req.body.animal.email;
			Animal.findOne({_id: id}, function (err, animal){
				animal.name = name;
				animal.email = email;
				
				animal.save(function (err){
					if (err) {
						req.flash('error', 'Operação não realizada');
						throw err
					}else{
						req.flash('success', 'Operação realizada com sucesso');
						res.redirect('/animais');
					};
				});
			});
		},
		show: function (req, res) {
			var params = {};
			Animal.find({}).sort({'updateAt': -1}).exec(function(err, animais){
				params = {
					animais : animais
				};
				res.render('animais/show', params);
			});
		},
//		entrar : function (req, res) {
//			res.render('users/session/entrar', {
//				tags : req.tags
//			});
//		},
		cadastrar : function (req, res) {
            var params = {};
			Fazenda.find({}).sort({'updateAt': -1}).exec(function(err, fazendas){
				params = {
					fazendas : fazendas
				};
                console.log(params);
				res.render('animais/cadastrarAnimal', params);
			});
		},
        
        
        
        
        
        
        
        
        
//        cadastrar : function (req, res) {
//			res.render('animais/cadastrarAnimal', {
//                
//			});
//		},
//		login : function (req, res) {
//			var query = { email : req.body.user.email };
//			var password = req.body.user.password;
//			User.findOne(query)
//				.select('name email password')
//				.exec(function(err, user){
//					if (user) {
//						if (crypter.validate(user.password, password)) {
//							req.session.user = user;
//							req.flash('success', 'Operação realizada com sucesso');
//							res.redirect('/')
//						}else{
//							req.flash('error', 'Senha incorreta');
//							res.redirect('/entrar')
//						}
//					} else{
//						req.flash('error', 'E-Mail incorreto');
//						res.redirect('/entrar')
//					};
//				});
//		},
		create : function (req, res) {
			var query = req.body.animal;
			query.fazenda = req.body.animal.fazenda._id;
            console.log()
			Animal.create(query, function (err, animal) {
				if (err) {
					res.redirect('/cadastrarAnimal');
				} else {
					req.flash('success', 'Operação realizada com sucesso');
				    res.redirect('/animais');
				};
			});
		}
//		logout : function (req, res) {
//			req.session.destroy();
//			res.redirect('/');
//		}
	};

	return AnimalController;
}