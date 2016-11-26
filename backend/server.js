'use strict';
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        sha = require('sha256'),
        fs = require('fs'),
        EmployeeService = require('./services/EmployeeService'),
        DepartmentService = require('./services/DepartmentService'),
        TimezoneService = require('./services/TimezoneService'),
        LoginService = require('./services/LoginService'),
        ScheduleService = require('./services/ScheduleService'),
        InputService = require('./services/InputService');

const Server = function(options) {
    const server = this;
    const mysql = options.mysql;
    
    const serverPort = options.serverPort;
    const serverAddress = options.serverAddress;
    // const server = this;
    
    console.log('serverPort:', serverPort);
    const setRoute = function(){
        let employeeServiceObj = new EmployeeService(options),
            departmentServiceObj = new DepartmentService(options),
            timezoneServiceObj = new TimezoneService(options),
            loginServiceObj = new LoginService(options),
            scheduleServiceObj = new ScheduleService(options),
            inputServiceObj = new InputService(options),
            allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };
        console.log('serverAddress:::::::::::::::::',serverAddress);
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: '12345%$#@!qazXSW',
            resave: false,
            saveUninitialized: true,
            // cookie: { secure : false, httpOnly : false, domain : serverAddress, maxAge : 1000 * 60 * 60 * 2 },
            cookie: { secure : false, httpOnly : false },
        }));
        app.use(allowCrossDomain);
        
        app.post('/login', loginServiceObj.logIn);
        app.get('/logout', loginServiceObj.logOff);

        app.post('/newDepartment', departmentServiceObj.newDepartmentDb);
        app.post('/upDepartment', departmentServiceObj.upDepartmentDb);
        app.post('/rmDepartment', departmentServiceObj.rmDepartmentDb);
        app.get('/getDepartment', departmentServiceObj.getDepartmentDb);

        app.post('/newEmployee', employeeServiceObj.newEmployeeDb);
        app.post('/upEmployee', employeeServiceObj.upEmployeeDb);
        app.post('/rmEmployee', employeeServiceObj.rmEmployeeDb);
        app.get('/getEmployee', employeeServiceObj.getEmployeeDb);
        app.get('/getWage', employeeServiceObj.getWageDb);
        
        app.post('/newTimeZone', timezoneServiceObj.newTimezoneDb);
        app.post('/upTimeZone', timezoneServiceObj.upTimezoneDb);
        app.post('/rmTimeZone', timezoneServiceObj.rmTimezoneDb);
        app.get('/getTimeZone', timezoneServiceObj.getTimeZoneDb);

        app.post('/newSchedule', scheduleServiceObj.newScheduleDb);
        app.post('/upSchedule', scheduleServiceObj.upScheduleDb);
        app.post('/rmSchedule', scheduleServiceObj.rmScheduleDb);
        app.post('/copySchedule', scheduleServiceObj.copyScheduleDb);
        app.post('/getSchedule', scheduleServiceObj.getScheduleDb);

        app.post('/newInput', inputServiceObj.newInputDb);
        app.post('/upInput', inputServiceObj.upInputDb);
        app.post('/getInput', inputServiceObj.getInputDb);

    };

    this.createServer = function () {
        app.use(express.static('public'));
        app.use(express.static('dist'));

        setRoute();
    
        // app.listen(process.env.PORT, function(){
        //     console.log('Conneted', process.env.PORT,' port!');
        // });
        
        app.listen(serverPort, function(){
            console.log('Conneted port!', serverPort);
        });
    };
};

Server.startServer = function(options){
    let server = new Server(options);
    server.createServer();
    return server;
};

module.exports = Server;

