'use strict';

var assert = require("assert");
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var frontman = require('../')

describe('frontman bin', function(){
	var cmd = 'node '+path.join(__dirname, '../bin/frontman')+' ';
	console.log(cmd);

	it('--help should run without errors', function(done) {
		exec(cmd+'--help', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('--version should run without errors', function(done) {
		exec(cmd+'--version', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('should return error on missing command', function(done) {
        this.timeout(4000);

		exec(cmd, function (error, stdout, stderr) {
			assert(error);
			assert.equal(error.code,1);
			done();
		});

	});

	it('should NOT return error on unknown command', function(done) {
        this.timeout(4000);

		exec(cmd+'junkcmd', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

});

describe('API Test with content', function(){
	var filename = "./test/src/test.md";
	//var original = fs.readFileSync(filename).toString();

    it('should create an object', function() {

        var expectedObj =
            {
                name: 'test',
                value: 10,
                old: 'oldvalue',
                array: [ 1, 2, 3 ],
                __content: '\r\nNow with content!!!',
                __basename: 'test.md',
                __dirname: './test/src'
            };

        var obj = frontman._readFile(filename);
        obj = frontman._process(obj);

        assert.deepEqual(obj, expectedObj);
    });

    it('should render yfm to YFM', function(){
        var expected =  fs.readFileSync("./test/expected/test.md").toString()
        assert.equal(frontman.renderFile(filename)+"\n", expected);
    });

    it('should render yfm to json', function(){
        var expected =  fs.readFileSync("./test/expected/test.json").toString();
        assert.equal(frontman.renderFile(filename, { toJson: true })+"\n", expected);
    });

    it('should render yfm to yml', function(){
        var expected = fs.readFileSync("./test/expected/test.yml").toString();
    	assert.equal(frontman.renderFile(filename, { toYaml: true })+"\n", expected);
    });

    it('should render yfm to cson', function(){
        var expected = fs.readFileSync("./test/expected/test.cson").toString();
    	assert.equal(frontman.renderFile(filename, { toCson: true })+"\n", expected);
    });

    it('should render yfm with json template', function(){
        var expected = fs.readFileSync("./test/expected/test_json.md").toString();
    	assert.equal(frontman.renderFile(filename, { template: "./test/src/template.json" })+"\n", expected);
    });

    it('should render yfm with cson template', function(){
    	var expected = fs.readFileSync("./test/expected/test_cson.md").toString();
    	assert.equal(frontman.renderFile(filename, { template: "./test/src/template.cson" })+"\n", expected);
    });

    it('should render yfm with cson template, and replace', function(){
        var expected = fs.readFileSync("./test/expected/test_cson_replace.md").toString();
        assert.equal(frontman.renderFile(filename, { template: "./test/src/template.cson", replace: true })+"\n", expected);
    });

});
