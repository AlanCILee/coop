'use strict';
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        sha = require('sha256'),
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
            saveUninitialized: true,
            cookie: { secure : false, httpOnly : false },
        }));

        let allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };

        app.use(allowCrossDomain);

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

            let query = `SELECT * FROM managers  
                INNER JOIN companies ON managers.companyId = companies.companyId 
                WHERE name = "${userId}" AND password = "${password}"`;

            let database = 'clients';

            mysql.sendQuery( database, query, function(err, rows, fields){
                if(err){
                    console.log('sendQuery fail: ', err);
                }else {
                    console.log('', rows);
                    if (rows.length > 0) {
                        if(userId === rows[0].name && password === rows[0].password) {
                            console.log('LOGIN START:', req.session);
                            req.session.viewname = rows[0].viewname;
                            req.session.company = rows[0].companyName;
                            req.session.save();
                            console.log('session: ', req.session);
                            // res.redirect('/welcome');
                        }
                    }else{

                    }

                }
                res.send(req.session);
            });
        });

        app.post('/newDepartment', function(req, res){
            let departName = req.body.dName;
            let departRatio = req.body.dRatio;
            let database = req.session.company || 'bluelasso';

            console.log('department req:',departName, ':', departRatio, 'for', database);

            let query = `INSERT INTO department (departName, departRatio) 
                VALUES ("${departName}", "${departRatio}")`;

            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ insertId : -1 });
                }else {
                    console.log('Insert new department', result);
                    res.send({ insertId : result.insertId });
                }
            });
        });

        app.post('/upDepartment', function(req, res){
            let departId = req.body.dId;
            let departName = req.body.dName;
            let departRatio = req.body.dRatio;
            let database = req.session.company || 'bluelasso';

            console.log('department req:',departName, ':', departRatio, 'for', database);

            let query = `UPDATE department SET 
                departName = "${departName}", departRatio = "${departRatio}"               
                WHERE departId = "${departId}"`;

            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ changedRows : 0 });
                }else {
                    console.log('Update new department', result);
                    res.send({ changedRows : result.changedRows });
                }
            });
        });


        // this.employeesObj.addEmployee(form.eId,
        //     form.name, form.department, form.phone, newWage);

        app.post('/newEmployee', function(req, res){
            let employeeName = req.body.name;
            let employeeDepart = req.body.department;
            let employeePhone = req.body.phone;
            let employeeWage = req.body.wage;
            let wagedate = req.body.date;
            let database = req.session.company || 'bluelasso';

            console.log('newEmployee req:', req.body, 'for', database);

            let query = `INSERT INTO employees (name, phone, departId) 
                VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}")`;

            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ insertId : -1 });
                }else {
                    console.log('Insert new employee', result);









                    res.send({ insertId : result.insertId });
                }
            });
        });


        app.get('/logout', function(req, res){
            console.log('user logout', req.session);
            // delete req.session.viewname;
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

