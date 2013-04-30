/*
 * GET home page.
 */

exports.index = function(req, res, next){
	res.redirect('performance');
	//res.render('index', { title: 'Express' });
};

exports.performance = function(req, res, next){
	res.render('performance', {config: req.query.t === 'mobile' ? 'mobile_performance_config.js' : 'pc_performance_config.js'});
};
