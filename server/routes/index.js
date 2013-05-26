/*
 * GET home page.
 */

exports.index = function(req, res, next) {
	res.redirect('performance');
	//res.render('index', { title: 'Express' });
};

exports.performance = function(req, res, next) {
	res.render('performance', {
		type: req.query.t,
		from: req.query.from || '',
		to:   req.query.to || '',
		unit: req.query.unit || '',
		browser: req.query.browser || '',
		country: req.query.country || '',
		page:    req.query.page || '',
		template: req.query.template || '',
		ab:   req.query.ab || ''
	});
};
