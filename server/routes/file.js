var fs = require('fs'),
	path = require('path');

exports.edit = function(req, res){
	res.render('edit_file',
		{content: fs.readFileSync(path.normalize(__dirname + '/../public/' + req.params.file), 'utf-8'),
		title: req.params.file});
};