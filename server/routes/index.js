/*
 * GET home page.
 */
var db   = require('../db')

exports.index = function(req, res, next) {
	res.redirect('performance');
	//res.render('index', { title: 'Express' });
};

exports.performance = function(req, res, next) {
	res.render('performance', {
		type     : req.query.t,
		from     : req.query.from || '',
		to       : req.query.to || '',
		unit     : req.query.unit || '',
		browser  : req.query.browser || '',
		country  : req.query.country || '',
		page     : req.query.page || '',
		template : req.query.template || '',
		ab       : req.query.ab || ''
	});
};

exports.data = function(req, res, next) {
	db.getData({
		browser    : req.query.browser,
		page       : req.query.page,
		abTag      : req.query.abtag,
		country    : req.query.country,
		startDate  : req.query.startdate,
		endDate    : req.query.enddate,
		dateUnit   : req.query.dateunit,
		site       : req.query.site
	}, res)
}