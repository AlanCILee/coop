
const InputService = function(options) {
	const mysql = options.mysql;

	this.newInputDb = function (req, res) {
		let database = req.session.company || 'bluelasso';
		console.log('input req:', req.body, 'for', database);

		let date = req.body.date;
		delete req.body.date;

		let zoneCnt = Object.keys(req.body).length;
		let cnt = 0;

		Object.keys(req.body).forEach((zoneId)=>{
			let query = `INSERT INTO tip (date, zoneId, tip)
                        VALUES ("${date}", "${zoneId}", "${req.body[zoneId]}")`;

			mysql.sendQuery(database, query, function (err, result) {
				if (err) {
					console.log('sendQuery fail: ', err);
					res.send({insertId: -1});
				} else {
					cnt++;
					console.log('Insert new tips: ', cnt, zoneCnt, result);
					if(cnt >= zoneCnt){
						res.send({insertId: result.insertId});
					}
				}
			});
		});
	};

	this.upInputDb = function (req, res) {
		let database = req.session.company || 'bluelasso';
		console.log('input req:', req.body, 'for', database);

		let zoneCnt = Object.keys(req.body).length;
		let cnt = 0;

		let date = req.body.date;
		delete req.body.date;

		Object.keys(req.body).forEach((zoneId)=>{
			let query = `UPDATE tip SET tip = "${req.body[zoneId]}"
							WHERE date = "${date}" AND zoneId = "${zoneId}"`;

			mysql.sendQuery(database, query, function (err, result) {
				if (err) {
					console.log('sendQuery fail: ', err);
					res.send({affectedRows: -1});
				} else {
					cnt++;
					console.log('Update new tips: ', cnt, result);
					if(cnt >= zoneCnt){
						res.send({affectedRows: result.affectedRows});
					}
				}
			});
		});
	};
	//
	// this.rmDepartmentDb = function (req, res) {
	// 	let departId = req.body.dId;
	// 	let database = req.session.company || 'bluelasso';
	//
	// 	console.log('department delete req:', departId);
	//
	// 	let query = `UPDATE department SET valid = "false"
	//                         WHERE departId = "${departId}"`;
	//
	// 	mysql.sendQuery(database, query, function (err, result) {
	// 		if (err) {
	// 			console.log('sendQuery fail: ', err);
	// 			res.send({affectedRows: -1});
	// 		} else {
	// 			console.log('deleted department', result);
	// 			res.send({affectedRows: result.affectedRows});
	// 		}
	// 	});
	// };
	//
	// this.getDepartmentDb = function(req, res) {
	// 	console.log('department list req');
	// 	let database = req.session.company || 'bluelasso';
	//
	// 	let query = `SELECT * FROM department`;
	//
	// 	mysql.sendQuery( database, query, function(err, results, fields){
	// 		if(err){
	// 			console.log('getDepartmentDb fail: ', err);
	// 			res.send({ err : 'getEmployeeDb fail' });
	// 		}else {
	// 			console.log('getDepartmentDb', results);
	// 			res.send(results);
	// 		}
	// 	});
	// };
}

module.exports = InputService;