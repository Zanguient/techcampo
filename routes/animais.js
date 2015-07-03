module.exports = function (app) {
	var animais = app.controllers.animais;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');
    var leitura = require('../middleware/leituraRFID');
    //app.get('/new', authentication, logged, fazendas.new);
	app.get('/animal/:id/edit', logged, authentication,animais.edit);
	app.put('/animal/:id', logged, authentication, animais.update);
	app.get('/animais', logged, authentication, animais.show);
	//app.post('/login', logged, users.login);
	//app.get('/entrar', logged, users.entrar);
	app.get('/cadastrarAnimal', logged, authentication, animais.cadastrar);
	app.post('/criar', logged, authentication,animais.create);
	//app.get('/logout', logged, users.logout);
}