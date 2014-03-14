/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
	pp=require('./routes/pp.js');
  
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
app.set('view options', {
layout: false
});});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes

app.get('/displ', pp.displ);
app.get('/',pp.index);
app.get('/calc',pp.calc);
app.get('/rend',pp.rend);
app.get('./views/battle.ejs', function(req, res) {
	fs.readFile('../views/battle.ejs', function(error, content) {
		if (error) {
			res.writeHead(500);
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(content, 'utf-8');
		}
	
	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
