'use strict';
const express = require('express'),
        app = express(),
        fs = require('fs');


const Server = function(options) {
    const mysql = options.mysql;
    // const server = this;

    const setRoute = function(){
        // app.get('/', function (req, res) {
        //     res.send('Hello home page');
        // });

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
            mysql.sendQuery( 'SELECT * FROM employees', function(rows){
                res.send(rows);
            });
        });

        app.post('/login', function(req, res){
            console.log('post login req:',req);
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

