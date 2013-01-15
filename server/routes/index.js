/*
 * GET home page.
 */

exports.index = function(req, res, next){
	res.redirect('overview.html');
	//res.render('index', { title: 'Express' });
};
