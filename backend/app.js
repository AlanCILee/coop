'use strict';

const server = require('./Server');
const mysql = require('./Mysql');


const sqlObj = mysql.start();
const options = { mysql: sqlObj};

server.startServer(options);
