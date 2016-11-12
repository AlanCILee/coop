
const EmployeeService = function(options) {
	const mysql = options.mysql;
	
	this.newEmployeeDb = function(req, res){
		let employeeName = req.body.name;
		let employeeDepart = req.body.department;
		let employeePhone = req.body.phone;
		let employeeWage = req.body.wage;
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
			}
		});
	}
	
	this.upEmployeeDb =  function(req, res){
		let employeeId = req.body.eId;
		let employeeName = req.body.name;
		let employeeDepart = req.body.department;
		let employeePhone = req.body.phone;
		let employeeWage = req.body.wage;
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
	};
	
	this.rmEmployeeDb = function(req, res){
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
	};
}
 
module.exports = EmployeeService;