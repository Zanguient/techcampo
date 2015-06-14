module.exports = function (app) {
	var db = require('../middleware/db_connect')();
	var Schema = require('mongoose').Schema;

	var FazendaSchema = new Schema({
		name: {type: String, required: true},
		email: {type: String, required: true},
				
	});

	return db.model('fazendas', FazendaSchema);
}