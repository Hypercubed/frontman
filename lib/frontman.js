// node
var fs = require('fs');
var path = require('path');
var util = require('util');

//npm
var program  = require('commander');
var extend = require('node.extend');


// Todo: reduce the number of dependencies
var yaml = require('js-yaml');				// Used for writing	yaml
var yfm = require('yaml-front-matter');  	// Only used for reading yfm
var CSON = require('cson');					// Only used for writing CSON
var coffee = require('coffee-script');		// Used for reading CSON

frontman = {}

// TODO: Move
frontman.render = function render(file, opts) {
	file = file || "";
	opts = opts || {};

	var template = opts.template || {};

	// Read source file, return json object with __content
	file = path.join(process.cwd(), file);
	source = frontman.readFile(file);

	global.document = { __basename: path.basename(file), __dirname: path.dirname(file)};
	global.document = extend(global.document, source);  // Add to global context for coffeescripts

		//result;
	//result.__dirname = path.dirname(file);

	// Read template, return json object  (TODO: can be cson, json, yaml, or file with yaml front matter)
	if (typeof template == "string") {  // Template filename supplied
		template = frontman.readFile(path.join(process.cwd(), opts.template));
	}

	// Join template with source
	var processed = frontman.extend(source, template, opts);

	var _opts = {};
	if (opts.toJson) _opts.type = "json";
	if (opts.toCson) _opts.type = "cson";
	if (opts.toYaml) _opts.type = "yml";
	//if (!opts.output) _opts.pretty = true;

	return frontman.stringify(processed, _opts);

}

frontman.extend = function(src, tmp, opts) {
	// Option to not extend __content
	// Should not extent addition __ data
	// Use underscore.js?

	//console.log(tmp);
	//tmp = extend(tmp, { __basename: undefined, __dirname: undefined });
	//console.log(tmp);

	
	if (opts.replace)  // If replacing, only keep content
		return extend({ __content: src.__content }, tmp);

	return extend(src, tmp);

}

// Read file, returns a file object.
frontman.readFile = function(file) {

	var content = fs.readFileSync(file, 'utf8'); // TODO: file not found

	var ext = file.split(/[. ]+/).pop();
	var result = frontman.parse(content, { type: ext });

	//result.__basename = path.basename(file);
	//result.__dirname = path.dirname(file);

	// Todo: add __filename, __dirname to object, source type?

	return result;

}


// Parse a source string, returning an object
// opts.type = cson|json|yml|other
frontman.parse = function(src, opts) {
	opts = opts || {};

	if (opts.type == "cson" ) 		// Todo: coffee?
		return coffee.eval(src) || {};

	if (opts.type == "json")
		return JSON.parse(src) || {};

	 if (opts.type == "yml")  	// Todo: yaml
		return yaml.load(src) || {};

	return yfm.parse(src) || { __content: src };

}

frontman.stringify = function(obj, opts) {  // Todo: errors
	opts = opts || {};

	if (opts.type == "cson" )
		return CSON.stringifySync(obj) || "";

	if (opts.type == "json") {
		if (opts.pretty)
			return util.inspect(obj, false, 10, true) || "";

		return JSON.stringify(obj, false, 4, true) || "";
	}

	if (opts.type == "yml")
		return yaml.dump(obj) || "";

	content = obj.__content;
	var data = extend({}, obj);
	delete data.__content;

	var result = 
		(Object.keys(data).length > 0) ?
		'---\n'+yaml.dump(data)+'---\n' : "";

	if (content)
		result += content;

	return result;

}

module.exports = exports = frontman;


