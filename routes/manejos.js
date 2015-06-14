module.exports = function (app) {
	var manejos = app.controllers.manejos;
	var comments = app.controllers.comments;
	var tags = app.controllers.tags;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');
	app.get('*', tags.list);

	app.get('/', logged, manejos.index);
	app.get('/manejos', logged, manejos.index);
	app.get('/manejo/:id', logged, manejos.show);
	app.get('/manejar', authentication, logged, manejos.manejar);
	app.post('/manejo', authentication, logged, manejos.create);
	app.get('/manejo/:id/editar', authentication, logged, manejos.edit);
	app.put('/manejo/:id', authentication, logged, manejos.update);
	app.del('/manejo/:id', authentication, logged, manejos.destroy);

	app.get('/search', logged, manejos.search);

	app.post('/manejo/:id/comment', comments.create);
	app.del('/manejo/:id/comment/:comment_id', comments.destroy);
}