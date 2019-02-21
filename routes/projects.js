var express = require('express');
var fs = require('fs');
var router = express.Router();
fs.readFile('data/database.json', 'utf8', function (err, data) {
	if (err) throw err;
	obj = JSON.parse(data);
	projects = obj.projects;
});

/* GET projects listing */
router.get('/', function(req, res) {
	res.render('projects', {
		title: 'projects',
		projects: projects
	});
});
// GET project information
router.get('/:id', function(req, res) {
	const project = projects.find(function(prod){
		return prod.id == req.params.id;
	});
	if (project)
		// Return the project information if id is valid
		res.render('project', {
			title: project.title,
			project: project
		});
	else
		// Return projects list if id is not valid
		res.render('projects', {
			title: 'projects',
			projects: projects
		});
});

module.exports = router;
