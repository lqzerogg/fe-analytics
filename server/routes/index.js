/*
 * GET home page.
 */

exports.index = function(req, res, next){
	res.redirect('overview');
	//res.render('index', { title: 'Express' });
};

exports.overview = function(req, res, next){
	res.render('overview', {});
};
