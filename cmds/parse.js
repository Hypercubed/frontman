module.exports = function (program) {
	//var prompter = require('prompter');
	var fs = require('fs');
	var path = require('path');
	var coffee = require('coffee-script');
	var extend = require('node.extend');
	var yaml = require('js-yaml');
	var jsYaml = require('yaml-front-matter');

	program
		.command('parse sourcefile templatefile')
		.version('0.0.0')
		// Todo: filename
		// Todo: output option
		// Todo: template option
		.description('')
		.action(function(src, tmp){
			//console.log(src, tmp);
	
			// Read file ane templates
			var template = fs.readFileSync(path.join(process.cwd(), tmp), 'utf8');
			var source = jsYaml.loadFront(path.join(process.cwd(), src));

			// Add to global boject
			global.base = source;

			// process template use cson for flexibility
			template = coffee.eval(template);

			// Extend back into base

			var processed = extend(source, template);

			var content = processed.__content;
			delete processed.__content;

			// Convert to yaml
			var y = yaml.dump(processed);

			console.log('---\n'+y+'---'+content);
			
		});
	
};