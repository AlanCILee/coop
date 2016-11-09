'use strict';

const server = require('./Server');
const mysql = require('./Mysql');


const mysqlObj = mysql.start();
const options = { mysql: mysqlObj};

server.startServer(options);
