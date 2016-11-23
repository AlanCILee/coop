'use strict';
const EmployeeService = function(options) {
	const mysql = options.mysql;
	
	this.newEmployeeDb = function(req, res){
		let employeeName = req.body.name;
		let employeeDepart = req.body.department;
		let employeePhone = req.body.phone;
		let employeeRatio = req.body.ratio;
		let employeeWage = req.body.wage;
		let wageDate = req.body.date;
		
		let database = req.session.company || 'bluelasso';
		console.log('newEmployee req:', req.body, 'for', database);
		
		// let query = `INSERT INTO employees (name, phone, departId, wage)
        //        VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}", "${employeeWage}")`;
		let query = `INSERT INTO employees (name, phone, departId, ratio) 
                VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}", "${employeeRatio}")`;
		
		mysql.sendQuery( database, query, function(err, result){
			if(err){
				console.log('INSERT new emp fail: ', err);
				res.send({ insertId : -1 });
			}else {
				let query = `INSERT INTO wage (wage, date, empId) 
                VALUES ("${employeeWage}", "${wageDate}", "${result.insertId}")`;
				
				mysql.sendQuery( database, query, function(err, result2){
					if(err){
						console.log('INSERT new emp fail: ', err);
						res.send({ insertId : -1 });
					}else{
						console.log('Inserted new employee', employeeName);
						res.send({ insertId : result.insertId });
					}
				});
			}
		});
	}
	
	this.upEmployeeDb =  function(req, res){
		let employeeId = req.body.eId;
		let employeeName = req.body.name;
		let employeeDepart = req.body.department;
		let employeePhone = req.body.phone;
		let employeeWage = req.body.wage;
		let employeeRatio = req.body.ratio;
		let wageDate = req.body.date;
		let database = req.session.company || 'bluelasso';
	
		console.log('upEmployee req:', req.body, 'for', database);
		
		let query = `UPDATE employees SET name = "${employeeName}",
		            phone = "${employeePhone}", departId = "${employeeDepart}", ratio = "${employeeRatio}"
                    WHERE empId = "${employeeId}"`;
		// let query = `INSERT INTO employees (name, phone, departId, wage)
	    //            VALUES ("${employeeName}", "${employeePhone}", "${employeeDepart}", "${employeeWage}")`;
		
		mysql.sendQuery( database, query, function(err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({affectedRows: -1});
			} else {
				console.log('update new employee', result);
				
				if (wageDate) {
					query = `INSERT INTO wage (wage, empId, date) 
                             VALUES ("${employeeWage}", "${employeeId}", "${wageDate}")`;
					mysql.sendQuery(database, query, function (err, result2) {
						if (err) {
							console.log('upEmployeeDb fail: ', err);
							res.send({affectedRows: -1});
						} else {
							console.log('Inserted new employee wage', result2);
							res.send({affectedRows: result2.affectedRows});
						}
					});
				} else {
					res.send({affectedRows: result.affectedRows});
				}
			}
		});
	};
	
	this.rmEmployeeDb = function(req, res){
		let employeeId = req.body.eId;
		let database = req.session.company || 'bluelasso';
	
		console.log('employee delete req:', employeeId );
	
		let query = `UPDATE employees SET valid = 0
	                        WHERE empId = "${employeeId}"`;
	
		mysql.sendQuery( database, query, function(err, result){
			if(err){
				console.log('rmEmployeeDb fail: ', err);
				res.send({ affectedRows : -1 });
			}else {
				console.log('deleted department', result);
				res.send({ affectedRows : result.affectedRows });
			}
		});
	};
	
	this.getEmployeeDb = function(req, res){
		console.log("DATA BASE: ============== ", req.session.company);
		console.log('employee list req');
		let database = req.session.company || 'bluelasso';
		
		let query = `SELECT * FROM employees`;
		
		mysql.sendQuery( database, query, function(err, results, fields){
			if(err){
				console.log('getEmployeeDb fail: ', err);
				res.send({ err : 'getEmployeeDb fail' });
			}else {
				console.log('getEmployeeDb', results);
				res.send(results);
			}
		});
	};
	
	this.getWageDb = function(req, res){
		console.log('employee list req');
		let database = req.session.company || 'bluelasso';
		
		let query = `SELECT * FROM wage`;
		
		mysql.sendQuery( database, query, function(err, results, fields){
			if(err){
				console.log('getWageDb fail: ', err);
				res.send({ err : 'getWageDb fail' });
			}else {
				console.log('getWageDb', results);
				res.send(results);
			}
		});
	};
}
 
module.exports = EmployeeService;