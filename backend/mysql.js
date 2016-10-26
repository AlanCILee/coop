'use strict';

const mysql = require('mysql');

const Mysql = function () {
    // const sql = this;

    let conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company',
        port: '3306'
    });

    this.sendQuery = function ( query, callback ){
        console.log('send query : '+query);

        conn.query( query, function(err,rows){
            if(err) {
                console.log(err);
                throw err;
            }
            console.log('Data received from Db:\n');
            console.log(rows);
            return callback(rows);
        });
    };

    conn.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n"+err);
        }
    });
};

Mysql.start = function(){
    return new Mysql();
};

module.exports = Mysql;


