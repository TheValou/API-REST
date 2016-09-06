var express = require('express');
var querystring = require('querystring');
var myParser = require("body-parser");
var db = require('./database');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var app = express();

global.statut = "";
db.get_users();

passport.use(new Strategy(

	function(username, password, done) {
		db.findByUsername(username, function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (user.password != password) { return done(null, false); }
			global.statut = user.role;
			return done(null, user);
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

.post('/users/', passport.authenticate('basic', { session: false }),  function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	if (global.statut != "admin")
	{
		res.status(403)
		.send({
			"code": 403,
			"message": "Must be admin"
		});
	}
	else
	{
		db.get_users();
		var found = 0;
		var new_user = {
			"id": null,
			"lastname": req.body['lastname'],
			"firstname": req.body['firstname'],
			"email": req.body['email'],
			"password": req.body['password'],
			"role": req.body['role']
		};

		for (var i = 0 ; i < global.row.length; i++) 
		{
			if (global.row[i]['email'] == req.body['email'])
			{
				found = 1;
				res.status(400)
				.send({"code": 400, "message": "email already used"});
			}
		}
		if (found == 0)
		{
			db.add_user(new_user);
			res.status(201)
			.send({
				"code": 201,
				"message": "Created User"
			});
		}
	}
}) //OK

.put('/users/:id',  passport.authenticate('basic', { session: false }), function(req, res) {

	res.setHeader('Content-Type', 'application/json');

	var found = 0;
	db.get_users();
	if (global.statut != "admin")
	{
		res.status(403)
		.send({
			"code": 403,
			"message": "Must be admin"
		});
	}
	else
	{
		for (var i = 0 ; i < global.row.length; i++)
		{
			if (global.row[i]['id'] == req.params.id)
			{
				found = 1;
				var user = {
					"lastname": req.body['lastname'],
					"firstname": req.body['firstname'],
					"email": req.body['email'],
					"password": req.body['password'],
					"role": req.body['role']
				};
					db.update_users(req.params.id, user);
				res.status(202).end(JSON.stringify(user));
			}
		}
		if (found == 0){
			res.status(404)
			.send({
				"code": 404,
				"message": "Not Found"
			});
		}
	}
})

.delete('/users/:id',  passport.authenticate('basic', { session: false }), function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (global.statut != "admin")
	{
		res.status(403)
		.send({
			"code": 403,
			"message": "Must be admin"
		});
	}
	else
	{
		db.get_users();
		var found = 0;

		for (var i = 0 ; i < global.row.length; i++) 
		{
			if (global.row[i]['id'] == req.params.id)
			{
				found = 1;
				if (global.row[i]['role'] == "admin")
					res.status(404)
				.send({"code": 404, "message": "Can't delete admin"});
				else
				{
					db.delete_users(req.params.id);
					res.status(204)
					.send({"code": 204, "message": "Success"});
				}
			}
		}
		if (found == 0)
		{
			res.status(404)
			.send({
				"code": 404,
				"message": "User not found"
			});
		}
	}
}) //OK



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

.get('/users/:id', 
	passport.authenticate('basic', { session: false }),
	function(req, res) {

		res.setHeader('Content-Type', 'application/json');

		var found = 0;
		db.get_users();

		for (var i = 0 ; i < global.row.length; i++)
		{
			if (global.row[i]['id'] == req.params.id)
			{
				found = 1;
				res.status(200).end(JSON.stringify(global.row[i]));
			}
		}
		if (found == 0){
			res.status(404)
			.send({
				"code": 404,
				"message": "Not Found"
			});
		}
	})
.get('/users', 
	passport.authenticate('basic', { session: false }),
	function(req, res) { 
		res.setHeader('Content-Type', 'application/json');
		db.get_users();
		res.status(200).end(JSON.stringify(global.row));

	})

app.listen(8081); 
