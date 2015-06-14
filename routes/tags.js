module.exports = function (app) {
	var manejos = app.controllers.manejos;
	var tags = app.controllers.tags;
	var logged = require('../middleware/logged');

	
	app.get('/tags/:tag', logged, tags.filter)
}