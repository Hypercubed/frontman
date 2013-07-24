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

	var template = opts.template || {};

	// Read source file, return json object with __content
	if (typeof source == "string") {  // Filename
		source = exports.readFile(path.join(process.cwd(), source));
	}

	global.base = source;  // Add to global context for coffeescripts

	// Read template, return json object  (TODO: can be cson, json, yaml, or file with yaml front matter)
	if (typeof template == "string") {  // Template filename supplied
		template = exports.readFile(path.join(process.cwd(), opts.template));
	}

	if (opts.replace) { // If replacing, only keep content
		source = { __content: source.__content };
	}

	// Join template with source
	var processed = extend(source, template);

	// Convert to yaml
	if (!opts.toJson) {
		processed = exports.dump(processed);
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


// Read file, returns a file object.
exports.readFile = function(file) {

	var content = fs.readFileSync(file, 'utf8'); // TODO: file not found

	if (file.match(/\.cson$/)) {
		//console.log('parsing cson');

		var result = coffee.eval(content) || {};  

	// TODO: else json
	// TODO: else yaml|yml

	} else if (file.match(/\.json$/)) {
		//console.log('parsing json');

		var result = JSON.parse(content) || {}; 

	} else if (file.match(/\.yml$/)) {
		//console.log('parsing yml');

		var result = yaml.load(content) || {};

	} else {
		//console.log('parsing other, checking for front matter');

		var result = front.parse(content) || { __content: content };

	}

	// TODO: add other object properties (__dirname, __filename)

	return result;

}


// Converts file object to yaml
exports.dump = function(fileobj) {

	content = fileobj.__content;
	delete fileobj.__content;

	if (Object.keys(fileobj).length > 0)
		var result = '---\n'+yaml.dump(fileobj)+'---\n';
	else
		var result = "";

	if (content)
		result += content;

	return result;

}



