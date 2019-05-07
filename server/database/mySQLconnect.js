let mysql = require('mysql');

let connection = mysql.createConnection({
    debug: true,
	host: 'localhost',
	port: 3306,
	user: 'cs386_jsmith',
	password:'sm1149',
	database: 'cs386_jsmith'
});

module.exports = connection;
