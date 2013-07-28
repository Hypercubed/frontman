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
var envfile = require('envfile');

frontman = {};


// Return text
frontman.renderFile = function(file, opts) {
	opts = opts || {};

	//var template = frontman._readFile( opts.template );
	//var source = frontman._readFile( file );

	file = file || "";
	opts = opts || {};

	// Read source file, return json object with __content

	var source = frontman._readFile( path.join(process.cwd(), file));

	//if (opts.output)
	//	extend(source, { __outputdir: opts.output });	

	if (opts.template) {

		var template = frontman._readFile( path.join(process.cwd(), opts.template));

	} else {

		template = {};

	}
	
	var processed = frontman._process(source, template, opts);

	var _opts = {};
	if (opts.toJson) _opts.type = "json";
	if (opts.toCson) _opts.type = "cson";
	if (opts.toYaml) _opts.type = "yml";

	return frontman.stringify(processed, _opts.type);
}

// Process srcObj using tmpObject, returning a file object
// Combine _process and _parse

frontman._process = function(srcObj, tmpObj, opts) {
	opts = opts || {};

	var srcObj = _parse(srcObj);

	if (tmpObj) {
		global.document = srcObj;

		tmpObj = _parse(tmpObj);

		//console.log('tmpObj', tmpObj);
	}

	if (opts.replace) { // If replacing, only keep content
		var result = extend({ __content: srcObj.__content }, tmpObj);
	} else {
		var result = extend(srcObj, tmpObj);
	}

	return result;

}


// Read file returning an unparsed object
frontman._readFile = function(file) {

	var raw = fs.readFileSync(file, 'utf8'); // TODO: file not found, Async

	var ext = file.split(/[. ]+/).pop();

	return { __raw: raw, __type: ext, __basename: path.basename(file), __dirname: path.dirname(file) };

}

// Parse the object
function _parse(srcObj) {

	var parsed = frontman.parse(srcObj.__raw, srcObj.__type);
	parsed = extend(srcObj, parsed);

	delete parsed.__raw;  // Optional
	delete parsed.__type;

	return parsed;
}


// Public API

// Parse a source string, returning a file object
// type = cson|json|yml|other
frontman.parse = function(src, type) {

	type = type || 'yfm';

	if (type == "cson" ) 		// Todo: coffee?
		return coffee.eval(src) || {};

	if (type == "json")
		return JSON.parse(src) || {};

	if (type == "yml")  	// Todo: yaml
		return yaml.load(src) || {};

	if (type == "env")
		return envfile.parseSync(src) || {};

	return yfm.parse(src) || { __content: src, __type: type };

}

frontman.stringify = function(obj, type) {  // Todo: errors
	//console.log(obj.__type);

	type = type || 'yfm';

	var data = extend({}, obj);  // Deep copy
	var content = obj.__content;

	delete data.__basename;
	delete data.__dirname;
	delete data.__outputdir;

	if (type == "cson" )
		return CSON.stringifySync(data) || "";

	if (type == "json") {
		//if (opts.pretty)
		//	return util.inspect(data, false, 10, true) || "";

		return JSON.stringify(data, false, 4, true) || "";
	}

	if (type == "yml")
		return yaml.dump(data) || "";

	delete data.__content;

	var result = 
		(Object.keys(data).length > 0) ?
		'---\n'+yaml.dump(data)+'---\n' : "";

	if (content)
		result += content;

	return result;

}

module.exports = exports = frontman;


