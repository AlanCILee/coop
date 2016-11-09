'use strict';
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        fs = require('fs');


const Server = function(options) {
    const mysqlClient = options.mysqlClient;
    // const server = this;

    const setRoute = function(){
        // app.get('/', function (req, res) {
        //     res.send('Hello home page');
        // });
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/route', function(req, res){
            fs.readFile( './dist/index.html', (err, data) => {
                if (err) {
                    console.log( err );
                    // emit the error
                    // return callback(err, `<h2>File Read Error: ${err.message}</h2>`);
                }

                let text = data.toString();
                res.send(text);
            });

        });

        app.get('/emp', function(req, res){
            // let feedback = {'alan': 'lee'};

            console.log('get emp route :');

        });

        app.post('/login', function(req, res){
            let userId = req.body.id;
            let password = req.body.password;

            console.log('post login req:',userId, ':', password);

            const mysql = require('mysql');

                const database = 'client';

                let conn = mysql.createConnection({
                    // host: 'localhost',
                    host: '127.0.0.1',
                    user: 'root',
                    password: '',
                    database: database,
                    port: '3306'
                });

                conn.connect(function (err) {
                    if (!err) {
                        console.log("Database is connected ... \n\n");
            let query = `SELECT * FROM clients WHERE name = "${userId}" AND password = "${password}"`;
            console.log(query);
            conn.query(query,
                function(err,result,fields){
                    console.log('post login err:',err);
                    console.log('post login result:',result);
                    // console.log('post login fields:',fields);
                });
                    } else {
                        console.log("Error connecting database ... \n\n"+err);
                    }
                });

            // conn.query( `SELECT * FROM clients WHERE name = "${userId}" AND password = "${password}"`,
            // console.log('post login req:',req.body.password);


            // conn.query( query, function(err,rows,fields){
                //         if(err) {
                //             console.log(err);
                //             throw err;
                //         }
                //         console.log('Data received from Db:\n');
                //         console.log(rows);
                //         return callback(rows,fields);
                //     });




            res.send("Success");
        });


    };

    this.createServer = function () {
        app.use(express.static('public'));
        app.use(express.static('dist'));

        setRoute();

        app.listen(3000, function(){
            console.log('Conneted 3000 port!');
        });
    };
};

Server.startServer = function(options){
    let server = new Server(options);
    server.createServer();
    return server;
};

module.exports = Server;

