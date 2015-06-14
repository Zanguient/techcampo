module.exports = function (app) {
	var Fazenda = app.models.fazendas;

	var FazendaController = {
		edit: function (req, res) {
			Fazenda.findOne({_id : req.params.id}, function (err, fazenda){
				res.render('fazendas/edit', {
					title: "Editar",
					fazenda: fazenda
				});
			})
		},
		update: function (req, res) {
			var id = req.params.id;
			var name = req.body.fazenda.name;
			var email = req.body.fazenda.email;
			Fazenda.findOne({_id: id}, function (err, fazenda){
				fazenda.name = name;
				fazenda.email = email;
				
				fazenda.save(function (err){
					if (err) {
						req.flash('error', 'Operação não realizada');
						throw err
					}else{
						req.flash('success', 'Operação realizada com sucesso');
						res.redirect('/fazendas');
					};
				});
			});
		},
		show: function (req, res) {
			var params = {};
			Fazenda.find({}).sort({'updateAt': -1}).exec(function(err, fazendas){
				params = {
					fazendas : fazendas
				};
				res.render('fazendas/show', params);
			});
		},
//		entrar : function (req, res) {
//			res.render('users/session/entrar', {
//				tags : req.tags
//			});
//		},
		cadastrar : function (req, res) {
			res.render('fazendas/cadastrarFazenda', {
                
			});
		},
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
			var query = req.body.fazenda;
			
			Fazenda.create(query, function (err, fazenda) {
				if (err) {
					res.redirect('/cadastrarFazenda');
				} else {
					req.flash('success', 'Operação realizada com sucesso');
				    res.redirect('/fazendas');
				};
			});
		}
//		logout : function (req, res) {
//			req.session.destroy();
//			res.redirect('/');
//		}
	};

	return FazendaController;
}