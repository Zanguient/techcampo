var app = require('../app');
var request = require('supertest')(app);

describe('In User Controller', function () {
	it('deve retornar status 200 ao fazer GET /', function (done) {
		request.get('/')
			   .end(function(err, res){
			   		res.status.should.eql(200);
			   		done();
			   });
	});

	it('deve ir para rota / ao fazer POST /signup', function (done) {
		var signup = { user: { name: "Usuário Teste", email: 'teste@teste.com', password: 'teste123' } };
		request.post('/signup')
				.send(signup)
				.end(function(err, res){
					res.headers.location.should.eql('/posts');
					done();
				});
	});

	it('deve ir para rota / ao fazer GET /logout', function (done) {
		request.get('/logout')
			   .end(function(err, res){
			   		res.headers.location.should.eql('/');
			   		done();
			   });
	});

	it('deve ir para rota /cadastrar ao fazer POST /signup', function (done) {
		var signup = { user: { name: "Usuário Teste 2", email: '', password: '' } };
		request.post('/signup')
				.send(signup)
				.end(function(err, res){
					res.headers.location.should.eql('/cadastrar');
					done();
				});
	});

	it('deve ir para rota / ao fazer POST /login', function (done) {
		var login = { user: { email: 'teste@teste.com', password: 'teste123' } };
		request.post('/login')
			   .send(login)
			   .end(function(err, res){
					res.headers.location.should.eql('/');
					done();
			   });
	});

	it('deve ir para rota / ao fazer POST /login', function (done) {
		var login = { user: { email: '', password: '' } };
		request.post('/login')
			   .send(login)
			   .end(function(err, res){
					res.headers.location.should.eql('/entrar');
					done();
			   });
	});
});
after(function (done) {
	require('./helpers').clearDb(done)
})