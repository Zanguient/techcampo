module.exports = function (app) {
	var db = require('../middleware/db_connect')();
	var Schema = require('mongoose').Schema;

	var AnimalSchema = new Schema({
		name: {type: String, required: true},
		brinco: {type: String, required: true},
        fazenda: { type : Schema.ObjectId, ref : 'fazendas' }
	});

	return db.model('animais', AnimalSchema);
}