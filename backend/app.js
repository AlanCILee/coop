'use strict';
const config = require('../config/config');
const server = require('./server');
const mysql = require('./mysql');
const mysqlObj = mysql.start();
const options = {
	mysql: mysqlObj,
	serverPort: config.SERVER_PORT,
	serverIpAddress: '127.0.0.1',

};
console.log(options);
server.startServer(options);
