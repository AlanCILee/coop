
const ScheduleService = function(options) {
	const mysql = options.mysql;

	this.newScheduleDb = function (req, res) {
		let sDate = req.body.date;
		let sEId = req.body.empId;
		let sDId = req.body.department;
		let sST = req.body.startT;
		let sET = req.body.endT;

		let database = req.session.company || 'bluelasso';

		console.log('newScheduleDb req:', sDate, sEId, sDId, sST, sET, 'for', database);

		let query = `INSERT INTO schedule (date, departId, empId, startT, endT)
                VALUES ("${sDate}", "${sDId}", "${sEId}", "${sST}", "${sET}")`;

		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('newScheduleDb fail: ', err);
				res.send({insertId: -1});
			} else {
				console.log('Insert new Schedule', result);
				res.send({insertId: result.insertId});
			}
		});
	};

	this.upScheduleDb = function (req, res) {
		let sId = req.body.jobId;
		let sDate = req.body.date;
		let sEId = req.body.empId;
		let sDId = req.body.department;
		let sST = req.body.startT;
		let sET = req.body.endT;
		let database = req.session.company || 'bluelasso';

		console.log('upScheduleDb req:', sDate, sEId, sDId, sST, sET, 'for', database);

		let query = `UPDATE schedule SET date = "${sDate}", departId ="${sDId}", empId="${sEId}", startT="${sST}", endT="${sET}" WHERE scheduleId = "${sId}"`;

		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({affectedRows: -1});
			} else {
				console.log('Update new schedule', result);
				res.send({affectedRows: result.affectedRows});
			}
		});
	};

	this.rmScheduleDb = function (req, res) {
		let sId = req.body.jobId;
		let database = req.session.company || 'bluelasso';

		console.log('ScheduleDb delete req:', sId);

		let query = `UPDATE schedule SET valid = "false" WHERE scheduleId = "${sId}"`;

		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({affectedRows: -1});
			} else {
				console.log('deleted schedule', result);
				res.send({affectedRows: result.affectedRows});
			}
		});
	};

	this.getScheduleDb = function (req, res) {
		console.log('schedule list req');
		let database = req.session.company || 'bluelasso';

		let query = `SELECT * FROM schedule WHERE date >= "${req.body.startD}" AND date <= "${req.body.endD}"`;

		mysql.sendQuery( database, query, function(err, results, fields){
			if(err){
				console.log('getScheduleDb fail: ', err);
				res.send({ err : 'getScheduleDb fail' });
			}else {
				console.log('getScheduleDb', results);
				res.send(results);
			}
		});
	}
}

module.exports = ScheduleService;