module.exports = function (app) {
	var Manejo = app.models.manejos;

	var CommentsController = {
		create: function (req, res) {
			Manejo.findOne({_id : req.params.id}, function (err, manejo){
				manejo.comments.push({
					email : req.body.comment.email,
					body : req.body.comment.body
				})
				manejo.save(function(){
					res.redirect('/manejo/'+manejo._id);
				})
			});
		},
		destroy: function(req, res){
			Manejo.findOne({_id: req.params.id}, function (err, manejo){
				manejo.comments = manejo.comments.filter(function(el) { return el._id != req.params.comment_id; });
				manejo.save(function(){
					res.redirect('/manejo/'+manejo._id);
				})
			});
		}
	};

	return CommentsController;
}