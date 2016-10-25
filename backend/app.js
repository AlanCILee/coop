'use strict';

const server = require('./Server');
const mysql = require('./Mysql');

server.startServer();
mysql.start();

