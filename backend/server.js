'use strict';
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        fs = require('fs');


const Server = function(options) {
    const server = this;
    const mysql = options.mysql;
    // const server = this;

    const setRoute = function(){
        // app.get('/', function (req, res) {
        //     res.send('Hello home page');
        // });
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: '12345%$#@!qazXSW',
            resave: false,
            saveUninitialized: true
        }));
        // app.get('/route', function(req, res){
        //     fs.readFile( './dist/index.html', (err, data) => {
        //         if (err) {
        //             console.log( err );
        //         }
        //         let text = data.toString();
        //         res.send(text);
        //     });
        // });
        //
        // app.get('/emp', function(req, res){
        //     console.log('get emp route :');
        // });

        app.post('/login', function(req, res){
            let userId = req.body.id;
            let password = req.body.password;
            console.log('post login req:',userId, ':', password);

            let query = `SELECT * FROM clients WHERE name = "${userId}" AND password = "${password}"`;
            let database = 'client';

            mysql.sendQuery( database, query, function(err, rows, fields){
                if(err){
                    console.log('sendQuery fail: ', err);
                }else {
                    console.log('', rows);
                    if (rows.length > 0) {
                        if(userId == rows[0].name && password == rows[0].password) {
                            console.log('LOGIN START');
                            req.session.viewname = rows[0].viewname;
                            // res.redirect('/welcome');
                        }
                    }else{

                    }

                }
                res.send(req.session);
            });
        });

        app.get('/logout', function(req, res){
            console.log('user ', req.session.viewname, 'logout');
            req.session.viewname = null;
            res.send(req.session);
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

