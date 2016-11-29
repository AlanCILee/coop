'use strict';
const LoginService = function(options) {
	const mysql = options.mysql;
	
	this.logIn = function(req, res){
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
						req.session.company = rows[0].dbName;
						req.session.companyName = rows[0].companyName;
						req.session.save();
						console.log('session: ================', req.session);
						// res.redirect('/welcome');
					}
				}else{
					
				}
			}
			res.send(req.session);
		});
	};
	
	this.logOff = function(req, res){
		console.log('user logout', req.session);
		delete req.session.viewname;
		delete req.session.company;
		delete req.session.companyName;
		res.send(req.session);
	};

	this.loginCheck = function(req, res){
		console.log('user login check', req.session);
		res.send(req.session);
	};
}

module.exports = LoginService;