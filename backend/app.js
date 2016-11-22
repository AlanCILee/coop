'use strict';

const server = require('./server');
const mysql = require('./mysql');
const mysqlObj = mysql.start();
const options = {
	mysql: mysqlObj,
	serverPort: 3000,
	serverIpAddress: '127.0.0.1',

};
console.log(options);
server.startServer(options);
