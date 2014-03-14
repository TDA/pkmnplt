// JavaScript Document
function attack()
{  
	var btle=require('btle.js');
	var app= exp.createServer();
	app.configure(function () {
	app.use(exp.bodyParser());
	app.use(exp.static(__dirname + 'E:/Project/Pokemon Pleatue JS'));
	});
	app.get('/atck',btle.atck);
	
}