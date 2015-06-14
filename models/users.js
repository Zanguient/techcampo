module.exports = function (app) {
	var db = require('../middleware/db_connect')();
	var Schema = require('mongoose').Schema;

	var UserSchema = new Schema({
		name: {type: String, required: true},
		email: {type: String, required: true, index: {unique: true}},
		password: {type: String, required: true},		
	});

	return db.model('users', UserSchema);
}