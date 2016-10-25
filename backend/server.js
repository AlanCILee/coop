'use strict';
const express = require('express'),
        app = express(),
        fs = require('fs');

const Server = function() {

    const setRoute = function(){
        app.get('/', function (req, res) {
            res.send('Hello home page');
        });

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

        app.get('/login', function(req, res){
            res.send('<h1>Login please</h1>');
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

Server.startServer = function(){
    let server = new Server();
    server.createServer();
    return server;
};

module.exports = Server;

