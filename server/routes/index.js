/*
 * GET home page.
 */

exports.index = function(req, res, next){
	res.redirect('performance');
	//res.render('index', { title: 'Express' });
};

exports.performance = function(req, res, next){
	res.render('performance', {
		type: req.query.t
	});
};
