'use strict';

const server = require('./server');
const mysql = require('./mysql');


const mysqlObj = mysql.start();
const options = { mysql: mysqlObj};

server.startServer(options);
