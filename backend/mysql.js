'use strict';

const mysql = require('mysql');

const Mysql = function () {
    let conn = null;
    let queryQue = [];

    const connectDb = function (database, callback){
        console.log('connect DB ');
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

    this.mysqlProcess = function(){
        setInterval(()=>{

            if(queryQue.length > 0 && !conn){
                let msg = queryQue.shift();

                connectDb(msg.database, function(err) {
                    if(err){
                        console.log('Connect DB Error :', err);
                    }else{
                        console.log('send query : ', msg.query, 'on :', msg.database);
                        conn.query( msg.query, function(err, rows, fields){
                            disconnectDb();
                            conn = null;
                            return msg.callback(err, rows, fields);
                        });
                    }
                });
            }
        }, 1);
    };

    this.sendQuery = function (database, query, callback){
        queryQue.push({database: database, query: query, callback: callback});
        console.log('mysql query Que: ',queryQue);
        //
        // connectDb(database, function(err) {
        //     if(err){
        //         console.log('Connect DB Error :', err);
        //     }else{
        //         console.log('send query : ', query, 'on :', database);
        //         conn.query( query, function(err, rows, fields){
        //             disconnectDb();
        //             return callback(err, rows, fields);
        //         });
        //     }
        // });
    };
};

Mysql.start = function(){
    const mysql = new Mysql();
    mysql.mysqlProcess();

    return mysql;
};

module.exports = Mysql;


