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

	if (typeof source == "string") {  // Filename
		source = front.loadFront(path.join(process.cwd(), source));  // TODO: if file not found
	}

	var processed = {};  // Output

	if (opts.template && typeof opts.template == "string") {  // Template filename supplied
		var template = fs.readFileSync(path.join(process.cwd(), opts.template), 'utf8');

		global.base = source;
		processed = coffee.eval(template);
	}

	// Extend back into base (make this optional)
	if (opts.extend)
		processed = extend(source, processed);

	// Convert to yaml
	if (!opts.toJson) {
		var content = processed.__content;
		delete processed.__content;

		processed = '---\n'+yaml.dump(processed)+'---';

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



