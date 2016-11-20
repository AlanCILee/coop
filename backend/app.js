'use strict';

const server = require('./server');
const mysql = require('./mysql');


const mysqlObj = mysql.start();
const options = {
	mysql: mysqlObj,
	serverPort: process.env.OPENSHIFT_NODEJS_PORT || 3000,
	serverIpAddress: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',

};
console.log(options);
server.startServer(options);
