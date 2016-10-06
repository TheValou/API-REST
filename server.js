var express = require('express');
var querystring = require('querystring');
var myParser = require("body-parser");
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var User = require('./models/user');

var app = express();

passport.use(new Strategy(

	function(username, password, done) {
		User.find({where: {email: username}}).then(function(user) {
			if (!user) { return done(null, false); }
			else if (user.password != password) { return done(null, false); }
			else { return done(null, user); }
		}).catch(function (e) {
			console.log("ERROR : Lors de la recherche");
			return done(e, null);
		});
	}
	));

app.use(passport.initialize());
app.use(passport.session());

app.use(myParser.json({extended : true}))

.get('/', passport.authenticate('basic', { session: false }), function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.status(200).send({"message": "OK"});
})

.get('/users', 
	passport.authenticate('basic', { session: false }),
	function(req, res) { 

		res.setHeader('Content-Type', 'application/json');
		User.findAll({}).then(function(user) {
			res.status(200).end(JSON.stringify(user));
		}).catch(function (e) {
			console.log("ERROR : Lors de la recherche");
		});
	})

.get('/users/:id', 
	passport.authenticate('basic', { session: false }),
	function(req, res) {

		res.setHeader('Content-Type', 'application/json');
		User.find({where: {id: req.params.id}}).then(function(user) {
			if (!user) { 
				res.status(404)
				.send({
					"code": 404,
					"message": "Not Found"
				}); 
			}
			else { res.status(200).end(JSON.stringify(user)); }
		}).catch(function (e) {
			console.log("ERROR : Lors de la recherche");
			return done(e, null);
		});
	})

.post('/users/', passport.authenticate('basic', { session: false }),  function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (req.user.role != "admin")
	{
		res.status(403)
		.send({
			"code": 403,
			"message": "Must be admin"
		});
	}
	else
	{
		User.find({where: {email: req.body['email']}}).then(function(user) {
			if (!user) {
				User.create({ lastname: req.body['lastname'], lastname: req.body['lastname'], 
					email: req.body['email'], password: req.body['password'],
					role: req.body['role']
				}).catch(function (e) {
					console.log("ERROR : Lors de l'enregistrement");
				});
				res.status(200).send({"code": 200, "message": "User created"});
			}
			else { res.status(400)
				.send({"code": 400, "message": "email already used"}); }
			}).catch(function (e) {
				console.log("ERROR : Lors de la recherche");
			});
		}
	})

.put('/users/:id', passport.authenticate('basic', { session: false }),  function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (req.user.role != "admin")
	{
		res.status(403)
		.send({
			"code": 403,
			"message": "Must be admin"
		});
	}
	else
	{
		User.find({where: {id: req.params.id}}).then(function(user) {
			if (user) {
				User.update({ lastname: req.body['lastname'], lastname: req.body['lastname'],
					password: req.body['password'],
					role: req.body['role']}, {where: {id: req.params.id}
				}).catch(function (e) {
					console.log("ERROR : Lors de l'enregistrement");
				});
				res.status(200).send({"code": 200, "message": "User updated"});
			}
			else { 
				res.status(404)
				.send({
					"code": 404,
					"message": "Not Found"
				});
			}
		}).catch(function (e) {
			console.log("ERROR : Lors de la recherche");
		});
	}
})

.delete('/users/:id',  passport.authenticate('basic', { session: false }), function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (req.user.role != "admin")
	{
		res.status(403)
		.send({
			"code": 403,
			"message": "Must be admin"
		});
	}
	else
	{
		User.find({where: {id: req.params.id}}).then(function(user) {
			if (!user) { 
				res.status(404)
				.send({
					"code": 404,
					"message": "Not Found"
				});
			}
			else 
				User.destroy({where: {id: req.params.id }});
		}).catch(function (e) {
			console.log("ERROR : Lors de la recherche");
		});
	}
})

.get('/search/users', passport.authenticate('basic', { session: false }), function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	db.get_users();
	var found = 0;
	var i;

	for (i = 0 ; i < global.row.length; i++)
	{
		if (global.row[i]['email'] == req.query.q)
		{
			found = 1;
			if (global.row[i]['role'] == 'admin')
				res.status(401)
			.send({
				"status": 401,
				"message": "Unauthorized"
			});
			else
				res.status(200).send(JSON.stringify(global.row[i]));
		}
	}
	if (found == 0)
	{
		res.status(404)
		.send({
			"code": 404,
			"message": "Not Found ErrorResponse"
		});
	}
})

app.listen(8081); 
