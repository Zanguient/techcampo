module.exports = function () {
	var mongoose = require('mongoose');
	var env_url = {
		"test": "mongodb://localhost/techcampo_test",
		"development": "mongodb://localhost/techcampo"
	};

	var url = env_url[process.env.NODE_ENV || "development"];
	return mongoose.createConnection(url);
}