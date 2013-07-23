// node
var fs = require('fs');
var path = require('path');
var util = require('util');

//npm
var program  = require('commander');
var coffee = require('coffee-script');
var extend = require('node.extend');
var yaml = require('js-yaml');
var front = require('yaml-front-matter');  // Note: this uses old version of js-yaml

module.exports = exports = {};

// TODO: Move
exports.render = function render(source, opts) {
	source = source || {};
	opts = opts || {};

	// Read source file, return json object with __content
	if (typeof source == "string") {  // Filename
		var contents = fs.readFileSync(path.join(process.cwd(), source), 'utf8');
		source = front.parse(contents);  // TODO: if file not found

		if (!source)  // If not conatins yaml, create empty json with contents
			source = { __content: contents }

	}

	// Read template, return json object
	if (opts.template && typeof opts.template == "string") {  // Template filename supplied
		var template = fs.readFileSync(path.join(process.cwd(), opts.template), 'utf8');
		global.base = source;
		template = coffee.eval(template);
	} else {
		var template = { };
	}

	if (opts.replace) { // If replacing, only keep content
		source = { __content: source.__content };
	}

	// Join templae with source
	var processed = extend(source, template);  

	// Convert to yaml
	if (!opts.toJson) {
		content = processed.__content;
		delete processed.__content;

		if (Object.keys(processed).length > 0)
			processed = '---\n'+yaml.dump(processed)+'---\n';
		else
			processed = "";

		if (content)
			processed += content;
		
	}
		
	if (opts.output) {
		fs.writeFile(opts.output, processed, function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
	} else {
		if (opts.toJson)
			processed = util.inspect(processed, false, 10, true);
		console.log(processed);
	}

}



