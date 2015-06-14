module.exports = function (app) {
	var fazendas = app.controllers.fazendas;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');
    
    //app.get('/new', authentication, logged, fazendas.new);
	app.get('/fazenda/:id/edit', logged, authentication,fazendas.edit);
	app.put('/fazenda/:id', logged, authentication, fazendas.update);
	app.get('/fazendas', logged, authentication, fazendas.show);
	//app.post('/login', logged, users.login);
	//app.get('/entrar', logged, users.entrar);
	app.get('/cadastrarFazenda', logged, authentication,fazendas.cadastrar);
	app.post('/create', logged, authentication,fazendas.create);
	//app.get('/logout', logged, users.logout);
}