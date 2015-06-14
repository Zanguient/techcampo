module.exports = function (app) {
	var _ = require("underscore");
	var Manejo = app.models.manejos;

	var TagController = {
		filter: function (req, res) {
			var params = {};
			var terms = {tags : req.params.tag}
			Manejo.find(terms, function(err, manejos){
				params = {
					manejos : manejos,
					tags : req.tags
				};
				res.render('manejo/index', params);
			});
		},
		list: function (req, res, next) {
			Manejo.find({}).select('tags').exec(function(err, manejos){
				var tags = [];
				_.each(manejos, function(manejo, index){
					tags.push(manejo.tags);
				});
				req.tags = tags.join(',');
				next();
			})
		}
	};

	return TagController;
}