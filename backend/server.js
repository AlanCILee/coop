'use strict';
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        sha = require('sha256'),
        fs = require('fs'),
        EmployeeService = require('./services/EmployeeService'),
        DepartmentService = require('./services/DepartmentService'),
        TimezoneService = require('./services/TimezoneService');

const Server = function(options) {
    const server = this;
    const mysql = options.mysql;

    // const server = this;

    const setRoute = function(){
        let employeeServiceObj = new EmployeeService(options),
            departmentServiceObj = new DepartmentService(options),
            timezoneServiceObj = new TimezoneService(options),
            allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };
        
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: '12345%$#@!qazXSW',
            resave: false,
            saveUninitialized: true,
            cookie: { secure : false, httpOnly : false },
        }));
        app.use(allowCrossDomain);
    
        
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
       
        app.get('/logout', function(req, res){
            console.log('user logout', req.session);
            // delete req.session.viewname;
            res.send(req.session);
        });

        app.post('/newDepartment', departmentServiceObj.newDepartmentDb);
        app.post('/upDepartment', departmentServiceObj.upDepartmentDb);
        app.post('/rmDepartment', departmentServiceObj.rmDepartmentDb);
                
        app.post('/newEmployee', employeeServiceObj.newEmployeeDb);
        app.post('/upEmployee', employeeServiceObj.upEmployeeDb);
        app.post('/rmEmployee', employeeServiceObj.rmEmployeeDb);
                
        app.post('/upTimeZone', timezoneServiceObj.upTimezoneDb);
        app.post('/newTimeZone', timezoneServiceObj.newTimezoneDb);
        app.post('/rmTimeZone', timezoneServiceObj.rmTimezoneDb);
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

