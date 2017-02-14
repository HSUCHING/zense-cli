/**
 * Created by chinghsu on 17/2/8.
 */
var path = require('path');
var metadata = require('read-metadata');
var exists = require('fs').existsSync;

module.exports = function options() {
	var opts = getMetadata();
	return opts;
};

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata(dir) {
	var js = path.join('./lib/', 'meta.js');
	var opts = {};
	if (exists(js)) {
		var req = require('./meta');
		if (req !== Object(req)) {
			throw new Error('meta.js needs to expose an object')
		}
		opts = req;
	}
	return opts;
}