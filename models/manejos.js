module.exports = function (app) {
	var db = require('../middleware/db_connect')();
	var Schema = require('mongoose').Schema;

	var getTags = function (tags) {
		return tags.join(',')
	}
	var setTags = function (tags) {
		return tags.split(',')
	}
	
	var ManejoSchema = new Schema({
		title: { type : String },
		body: { type : String },
		user: { type : Schema.ObjectId, ref : 'users' },
		comments: [{
			email: { type : String },
			body: { type : String },
			createdAt: { type : Date, default : Date.now }
		}],
		tags: {type: [], get: getTags, set: setTags },
		createdAt  : { type : Date, default : Date.now },
		updateAt  : { type : Date, default : Date.now }
	});

	return db.model('manejos', ManejoSchema);
}