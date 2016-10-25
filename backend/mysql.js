'use strict';

const mysql = require('mysql');

let Mysql = function () {
    // const sql = this;

    let conn = mysql.createConnection({
        host: '0.0.0.0',
        user: 'root',
        password: '',
        database: 'company',
        port: '3306'
    });

    this.sendQuery = function ( query ){
        console.log('send query : '+query);

        conn.query( query, function(err,rows){
            if(err) {
                console.log(err);
                throw err;
            }
            console.log('Data received from Db:\n');
            console.log(rows);
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
    let mysql = new Mysql();
    mysql.sendQuery( 'SELECT * FROM employees' );

};

module.exports = Mysql;


