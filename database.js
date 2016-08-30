var mysql      = require('mysql');
var fs 		   = require('fs');

function BD(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'tcm_rest'
	});
	return connection;
}

var bd = BD();
bd.connect();

exports.get_users = function get_users(){
	bd.query('SELECT * FROM user', function(err, rows, fields) {
		if (err) throw err;
		global.row = rows;
		return (rows);
	});
}

exports.update_users = function update_users(id, user){
	var query = 
	bd.query('UPDATE user SET lastname="'+user.lastname+'", firstname="'+user.firstname+'", email="'+user.lastname+'", password="'+user.lastname+'", role="'+user.lastname+'"  WHERE id = ?', id, function(err) {
			if (err) {
				console.log(err.message);
			} else {
				console.log('success');
			}
		});
}

exports.findByUsername = function(username, cb) {
	bd.query('SELECT * FROM user', function(err, rows, fields) {
		if (err) throw err;
		if (rows === undefined)
			console.log(erreur);
		for (var i = 0, len = rows.length; i < len; i++) {
			var record = rows[i];
			if (record.email === username) {
				return cb(null, record);
				} //if 
			} //boucle for
			return cb(null, null);
		});
}

exports.add_user = function(new_user){
	bd.query('INSERT INTO user SET ?', new_user, function(error) {
		if (error) {
			console.log(error.message);
		} else {
			console.log('success');
		}
	});
}

exports.delete_users = function(id){
	bd.query('DELETE FROM user WHERE id = ?', id, function(error) {
		if (error) {
			console.log(error.message);
		} else {
			console.log('success');
		}
	});
}