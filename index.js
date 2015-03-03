'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var rocambole = require('rocambole');
var stripConsole = require('rocambole-strip-console');

module.exports = function () {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-strip-debug-only-console', 'Streaming not supported'));
			return;
		}

        var stripFunc = function(src) {
            return rocambole.moonwalk(src, function (node) {
                stripConsole(node);
            });
        };

		try {
			file.contents = new Buffer(stripFunc(file.contents.toString()).toString());
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-strip-debug-only-console', err, {fileName: file.path}));
		}

		cb();
	});
};
