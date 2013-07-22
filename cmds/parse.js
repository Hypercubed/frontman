module.exports = function (program) {
	//var prompter = require('prompter');
	var fs = require('fs');
	var path = require('path');
	var coffee = require('coffee-script');
	var extend = require('node.extend');
	var yaml = require('js-yaml');

	program
		.command('parse')
		.version('0.0.0')
		.description('')
		.action(function(){
			// Your code goes here

			// Read file ane templates
			var template = fs.readFileSync(path.join(process.cwd(), '/test.json'), 'utf8');
			var base = require("../test.yml");

			// Add to global boject
			global.base = base;

			// process template use cson for flexibility
			template = coffee.eval(template);

			// Extend back into base
			base = extend(base, template);

			// Convert to yaml
			var y = yaml.dump(base);

			console.log(y);
			
		});
	
};