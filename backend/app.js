'use strict';

const server = require('./Server');
const mysql = require('./Mysql');


const sqlCompany = mysql.start('company');
const sqlClient = mysql.start('client');
const options = { mysqlClient: sqlClient};

server.startServer(options);
