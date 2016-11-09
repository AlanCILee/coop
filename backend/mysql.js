'use strict';

const mysql = require('mysql');

const Mysql = function (db) {
    // const database = 'company';
    const database = db;

    this.conn = mysql.createConnection({
        // host: 'localhost',
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: database,
        port: '3306'
    });
    //
    // this.sendQuery = function ( query, callback){
    //     console.log('send query : '+query);
    //
    //     conn.query( query, function(err,rows,fields){
    //         if(err) {
    //             console.log(err);
    //             throw err;
    //         }
    //         console.log('Data received from Db:\n');
    //         console.log(rows);
    //         return callback(rows,fields);
    //     });
    // };

    this.conn.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n"+err);
        }
    });
};

Mysql.start = function(db){
    return new Mysql(db);
};

module.exports = Mysql;


