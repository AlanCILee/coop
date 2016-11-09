'use strict';

const mysql = require('mysql');

const Mysql = function () {
    let conn = null;

    const connectDb = function (database, callback){
        conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: database,
            port: '3306'
        });

        conn.connect(function(err){
            return callback(err);
        });
    };

    const disconnectDb = function(){
        console.log('disconnect DB ');
        conn.end();
    };

    this.sendQuery = function (database, query, callback){
        console.log('send query : ', query, 'on :', database);

        connectDb(database, function(err) {
            if(err){
                console.log('Connect DB Error :', err);
            }else{
                conn.query( query, function(err, rows, fields){
                    return callback(err, rows, fields);
                });
            }
            disconnectDb();
        });

    };
};

Mysql.start = function(){
    return new Mysql();
};

module.exports = Mysql;


