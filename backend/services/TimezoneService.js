'use strict';
const TimezoneService = function(options) {
	const mysql = options.mysql;
	
	this.newTimezoneDb = function(req, res){
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
	};
	
	this.upTimezoneDb = function(req, res){
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
				
				let query = `UPDATE timezone SET valid = 0               
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
	};
	
	this.rmTimezoneDb = function (req, res) {
		let zoneId = req.body.zoneId;
		let database = req.session.company || 'bluelasso';
		
		console.log('zone delete req:', zoneId);
		
		let query = `UPDATE timezone SET valid = 0               
                        WHERE zoneId = "${zoneId}"`;
		
		mysql.sendQuery(database, query, function (err, result) {
			if (err) {
				console.log('sendQuery fail: ', err);
				res.send({affectedRows: -1});
			} else {
				console.log('deleted zone', result);
				res.send({affectedRows: result.affectedRows});
			}
		});
	};


	this.getTimeZoneDb = function(req, res) {
		console.log('timezone list req');
		let database = req.session.company || 'bluelasso';

		let query = `SELECT * FROM timezone`;

		mysql.sendQuery( database, query, function(err, results, fields){
			if(err){
				console.log('getTimeZoneDb fail: ', err);
				res.send({ err : 'getTimeZoneDb fail' });
			}else {
				console.log('getTimeZoneDb', results);
				res.send(results);
			}
		});
	};
}

module.exports = TimezoneService;