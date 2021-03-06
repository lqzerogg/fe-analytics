var fs = require('fs'),
	path = require('path'),
	linter = require("jslint/lib/linter"),
	reporter = require("jslint/lib/reporter");

exports.edit = function(req, res) {
	res.render('edit_file',
		{content: fs.readFileSync(path.normalize(__dirname + '/../public/' + req.params.file), 'utf-8'),
		title: req.params.file});
};

exports.save = function(req, res) {
	fs.writeFileSync(path.normalize(__dirname + '/../public/' + req.params.file), req.body.content, 'utf-8');
	res.send('');
};

exports.lint = function(req, res) {
	res.send(linter.lint(req.body.data).errors);
};