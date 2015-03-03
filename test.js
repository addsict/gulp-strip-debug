'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var stripDebug = require('./');

it('should strip debugging', function (cb) {
	var stream = stripDebug();

	stream.on('data', function (file) {
		assert.equal(file.contents.toString(), 'function test(){void 0;}');
		cb();
	});

	stream.write(new gutil.File({
		contents: new Buffer('function test(){console.log("test");}')
	}));
});
