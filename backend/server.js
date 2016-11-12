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

            let query = `UPDATE department SET valid = "false"               
                        WHERE departId = "${departId}"`;

            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ affectedRows : -1 });
                }else {
                    console.log('Update new department', result);
    
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
                }
            });
        });
    
        app.post('/rmDepartment', function(req, res){
            let departId = req.body.dId;
            let database = req.session.company || 'bluelasso';
        
            console.log('department delete req:', departId );
        
            let query = `UPDATE department SET valid = "false"               
                        WHERE departId = "${departId}"`;
        
            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ affectedRows : -1 });
                }else {
                    console.log('deleted department', result);
                    res.send({ affectedRows : result.affectedRows });
                }
            });
        });
        
        app.post('/newEmployee', function(req, res){
            let employeeName = req.body.name;
            let employeeDepart = req.body.department;
            let employeePhone = req.body.phone;
            let employeeWage = req.body.wage;
            // let wagedate = req.body.date;
            let database = req.session.company || 'bluelasso';

            console.log('newEmployee req:', req.body, 'for', database);
    
            let query = `INSERT INTO employees (name, phone, departId, wage) 
                VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}", "${employeeWage}")`;

            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ insertId : -1 });
                }else {
                    console.log('Inserted new employee', result);
                    res.send({ insertId : result.insertId });
    
                    // query = `INSERT INTO wage (wage, empId, date)
                    //     VALUES ("${employeeWage}", "${result.insertId}", "${wagedate}")`;
                    //
                    // mysql.sendQuery( database, query, function(err, result2){
                    //     if(err){
                    //         console.log('sendQuery fail: ', err);
                    //         res.send({ insertId : -1 });
                    //     }else{
                    //         console.log('Inserted new employee wage', result2);
                    //         res.send({ insertId : result.insertId });
                    //     }
                    //
                    // });
                }
            });
        });

        app.post('/upEmployee', function(req, res){
            let employeeId = req.body.eId;
            let employeeName = req.body.name;
            let employeeDepart = req.body.department;
            let employeePhone = req.body.phone;
            let employeeWage = req.body.wage;
            // let wagedate = req.body.date;
            let database = req.session.company || 'bluelasso';
        
            console.log('upEmployee req:', req.body, 'for', database);
    
            let query = `INSERT INTO employees (name, phone, departId, wage) 
                VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}", "${employeeWage}")`;
    
            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('update employee : new insert fail ', err);
                    res.send({ insertId : -1 });
                }else {
                    console.log('Inserted new employee', result);
    
                    query = `UPDATE employees SET valid = "false"               
                        WHERE empId = "${employeeId}"`;
                    
                    mysql.sendQuery( database, query, function(err, result2){
                        if(err){
                            console.log('update employee : old employee invalid fail: ', err);
                            res.send({ insertId : -1 });
                        }else{
                            console.log('update employee success', result2);
                            res.send({ insertId : result.insertId });
                        }
                    });
                }
            });
            
            //
            // let query = `UPDATE employees SET valid = "false"
            //             WHERE empId = "${employeeId}"`;
            //
            // mysql.sendQuery( database, query, function(err, result){
            //     if(err){
            //         console.log('sendQuery fail: ', err);
            //         res.send({ affectedRows : -1 });
            //     }else {
            //         console.log('update new employee', result);
            //
            //         let query = `INSERT INTO employees (name, phone, departId)
            //                     VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}")`;
            //
            //         mysql.sendQuery( database, query, function(err, result){
            //             if(err){
            //                 console.log('sendQuery fail: ', err);
            //                 res.send({ insertId : -1 });
            //             }else {
            //                 console.log('Inserted new employee', result);
            //
            //                 if( wagedate ){
            //                     query = `INSERT INTO wage (wage, empId, date)
            //                         VALUES ("${employeeWage}", "${employeeId}", "${wagedate}")`;
            //                     mysql.sendQuery( database, query, function(err, result2){
            //                         if(err){
            //                             console.log('sendQuery fail: ', err);
            //                             res.send({ affectedRows : -1 });
            //                         }else{
            //                             console.log('Inserted new employee wage', result2);
            //                             res.send({ affectedRows : result2.affectedRows });
            //                         }
            //                     });
            //                 }else{
            //                     res.send({ affectedRows : result.affectedRows });
            //                 }
            //             }
            //         });
            //     }
            // });
            
            // let query = `UPDATE employees SET
            //     name = "${employeeName}", phone = "${employeePhone}", departId= "${employeeDepart}"
            //     WHERE empId = "${employeeId}"`;
            //
            // mysql.sendQuery( database, query, function(err, result){
            //     if(err){
            //         console.log('sendQuery fail: ', err);
            //         res.send({ affectedRows : -1 });
            //     }else {
            //         console.log('update new employee', result);
            //
            //         if( wagedate ){
            //             query = `INSERT INTO wage (wage, empId, date)
            //                 VALUES ("${employeeWage}", "${employeeId}", "${wagedate}")`;
            //             mysql.sendQuery( database, query, function(err, result2){
            //                 if(err){
            //                     console.log('sendQuery fail: ', err);
            //                     res.send({ affectedRows : -1 });
            //                 }else{
            //                     console.log('Inserted new employee wage', result2);
            //                     res.send({ affectedRows : result2.affectedRows });
            //                 }
            //             });
            //         }else{
            //             res.send({ affectedRows : result.affectedRows });
            //         }
            //     }
            // });
        });
    
        app.post('/rmEmployee', function(req, res){
            let employeeId = req.body.eId;
            let database = req.session.company || 'bluelasso';
        
            console.log('employee delete req:', employeeId );
        
            let query = `UPDATE employees SET valid = "false"               
                        WHERE empId = "${employeeId}"`;
        
            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ affectedRows : -1 });
                }else {
                    console.log('deleted department', result);
                    res.send({ affectedRows : result.affectedRows });
                }
            });
        });
        
        
        app.post('/upTimeZone', function(req, res){
            let zoneId = req.body.zoneId;
            let zoneName = req.body.zoneName;
            let startT = req.body.startT;
            let endT = req.body.endT;
            let database = req.session.company || 'bluelasso';
        
            console.log('upTimeZone req:', req.body, 'for', database);
    
            let query = `INSERT INTO timezone (zoneName, startT, endT) 
                VALUES ("${zoneName}", "${startT}", "${endT}")`;
    
            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ insertId : -1 });
                }else {
                    console.log('Inserted new timezone', result);
  
                    let query = `UPDATE timezone SET valid = "false"               
                                WHERE zoneId = "${zoneId}"`;

                    mysql.sendQuery( database, query, function(err, result2){
                        if(err){
                            console.log('sendQuery fail: ', err);
                            res.send({ insertId : -1 });
                        }else{
                            console.log('Update old timezone to false', result2);
                            res.send({ insertId : result.insertId });
                        }
                    });
                }
            });
        });
    
        app.post('/newTimeZone', function(req, res){
            let zoneName = req.body.zoneName;
            let startT = req.body.startT;
            let endT = req.body.endT;
            
            let database = req.session.company || 'bluelasso';
        
            console.log('newTimeZone req:', req.body, 'for', database);
        
            let query = `INSERT INTO timezone (zoneName, startT, endT) 
                VALUES ("${zoneName}", "${startT}", "${endT}")`;
        
            mysql.sendQuery( database, query, function(err, result){
                if(err){
                    console.log('sendQuery fail: ', err);
                    res.send({ insertId : -1 });
                }else {
                    console.log('Inserted new employee', result);
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

