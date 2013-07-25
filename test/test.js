
var fs = require("fs");
var assert = require("assert");

var frontman = require("../lib/frontman.js");




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
                __content: '\r\nNow with content!!!' 
            };

        var obj = frontman.readFile(filename);

        assert.deepEqual(obj, expectedObj);
    });

    it('should render yfm to YFM', function(){
        var expected =  fs.readFileSync("./test/expected/test.md").toString()
        assert.equal(frontman.render(filename)+"\n", expected);
    });

    it('should render yfm to json', function(){
        var expected =  fs.readFileSync("./test/expected/test.json").toString();
        assert.equal(frontman.render(filename, { toJson: true })+"\n", expected);
    });

    it('should render yfm to yml', function(){
        var expected = fs.readFileSync("./test/expected/test.yml").toString();
    	assert.equal(frontman.render(filename, { toYaml: true })+"\n", expected);
    });

    it('should render yfm to cson', function(){
        var expected = fs.readFileSync("./test/expected/test.cson").toString();
    	assert.equal(frontman.render(filename, { toCson: true })+"\n", expected);
    });

    it('should render yfm with json template', function(){
        var expected = fs.readFileSync("./test/expected/test_json.md").toString();
    	assert.equal(frontman.render(filename, { template: "./test/src/template.json" })+"\n", expected);
    });

    it('should render yfm with cson template', function(){
    	var expected = fs.readFileSync("./test/expected/test_cson.md").toString();
    	assert.equal(frontman.render(filename, { template: "./test/src/template.cson" })+"\n", expected);
    });

    it('should render yfm with cson template, and replace', function(){
        var expected = fs.readFileSync("./test/expected/test_cson_replace.md").toString();
        assert.equal(frontman.render(filename, { template: "./test/src/template.cson", replace: true })+"\n", expected);
    });

});