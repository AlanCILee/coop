"use strict";

const mysql = require('mysql');

let Mysql = function(){
	let connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'company'
	});
	
	this.connect = connection.connect(function (err) {
		if (!err) {
			console.log("Database is connected ... \n\n");
		} else {
			console.log("Error connecting database ... \n\n");
		}
	});
};

