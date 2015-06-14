module.exports = function (app) {

	var Manejo = app.models.manejos;
	var User = app.models.users;

	var ManejoController = {
		index : function (req, res) {
			var params = {};
			Manejo.find({}).sort({'updateAt': -1}).exec(function(err, manejos){
				params = {
					manejos : manejos,
					tags : req.tags
				};
				res.render('manejo/index', params);
			});
		},
		show: function (req, res) {
			var params = {};
			Manejo.findOne({_id : req.params.id}, function(err, manejo){
				User.findOne({_id : manejo.user}, function(err, user){
					if (err) {
						throw err;
					}else{
						params = {
							manejo : manejo,
							user : user,
							tags : req.tags
						};
						res.render('manejo/show', params);
					};
				})
			})
		},
		manejar: function (req, res) {
			res.render('manejo/new', {
				title : "Novo Manejo",
				manejo : new Manejo({}),
				tags : ''
			});
		},
		create: function (req, res) {
			var query = req.body.manejo;
			query.user = req.session.user._id;
			Manejo.create(query, function (err, manejo) {
				if (err) {
					req,flash('error', "Alguns erros foram encontrados");
					res.redirect('/manejar');
				} else {
					req.flash('success', "Operação realizada com sucesso");
					res.redirect('/manejo/'+manejo._id);
				};
			});
		},
		edit: function (req, res) {
			Manejo.findOne({_id : req.params.id}, function (err, manejo){
				res.render('manejo/edit', {
					title: "Editar",
					manejo: manejo,
					tags : req.tags
				});
			})
		},
		update: function (req, res) {
			var id = req.params.id;
			var emanejo = req.body.manejo;
			
			Manejo.findOne({_id: id}, function (err, manejo){
				manejo.title = emanejo.title;
				manejo.body = emanejo.body;
				manejo.tags = emanejo.tags;
				manejo.updateAt = Date.now();
				
				manejo.save(function (err){
					if (err){ 
						req.flash('error', "Alguns erros encontrados");
						throw err;
					}else{
						req.flash('success', "Operação realizada com sucesso");
						res.redirect('/manejo/'+manejo._id);
					};
				});
			});
		},
		destroy: function (req, res) {
			var id = req.params.id;
			Manejo.remove({_id : id}, function (err) {
				if (err){
					throw err
					req.flash('error', "Operação não realizada")
				}else{
					req.flash('success', "Operação realizada com sucesso");
					res.redirect('/manejo');
				};
			})
		},

		//Search
		search: function (req, res) {
			var terms = {title: { $regex: req.query.search, $options: 'i' }}
			Manejo.find(terms, function(err, manejos){
				params = { 
					manejos : manejos,
					tags : req.tags
				};
				res.render('manejo/index', params);
			});
		}
	}

	return ManejoController;
}