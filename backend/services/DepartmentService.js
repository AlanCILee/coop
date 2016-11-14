
const DepartmentService = function(options) {
	const mysql = options.mysql;
	
	this.newDepartmentDb = function (req, res) {
		let departName = req.body.dName;
		let departRatio = req.body.dRatio;
		let database = req.session.company || 'bluelasso';
		
		console.log('department req:', departName, ':', departRatio, 'for', database);
		
		let query = `INSERT INTO department (departName, departRatio) 
                VALUES ("${departName}", "${departRatio}")`;
		
		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({insertId: -1});
			} else {
				console.log('Insert new department', result);
				res.send({insertId: result.insertId});
			}
		});
	}

	this.upDepartmentDb = function (req, res) {
		let departId = req.body.dId;
		let departName = req.body.dName;
		let departRatio = req.body.dRatio;
		let database = req.session.company || 'bluelasso';
		
		console.log('department req:', departName, ':', departRatio, 'for', database);
		
		let query = `UPDATE department SET valid = "false"               
	                        WHERE departId = "${departId}"`;
		
		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({affectedRows: -1});
			} else {
				console.log('Update new department', result);
				
				let query = `INSERT INTO department (departName, departRatio) 
	                                VALUES ("${departName}", "${departRatio}")`;
				
				mysql.sendQuery(database, query, function (err, result) {
					if (err) {
						console.log('sendQuery fail: ', err);
						res.send({insertId: -1});
					} else {
						console.log('Insert new department', result);
						res.send({insertId: result.insertId});
					}
				});
			}
		});
	};

	this.rmDepartmentDb = function (req, res) {
		let departId = req.body.dId;
		let database = req.session.company || 'bluelasso';
		
		console.log('department delete req:', departId);
		
		let query = `UPDATE department SET valid = "false"               
	                        WHERE departId = "${departId}"`;
		
		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({affectedRows: -1});
			} else {
				console.log('deleted department', result);
				res.send({affectedRows: result.affectedRows});
			}
		});
	};

	this.getDepartmentDb = function(req, res) {
		console.log('department list req');
		let database = req.session.company || 'bluelasso';

		let query = `SELECT * FROM department`;

		mysql.sendQuery( database, query, function(err, results, fields){
			if(err){
				console.log('getDepartmentDb fail: ', err);
				res.send({ err : 'getEmployeeDb fail' });
			}else {
				console.log('getDepartmentDb', results);
				res.send(results);
			}
		});
	};
}

module.exports = DepartmentService;