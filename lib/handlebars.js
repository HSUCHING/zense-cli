/**
 * Created by chinghsu on 17/2/14.
 */
var Handlebars = require('handlebars');

// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
	return a === b
		? opts.fn(this)
		: opts.inverse(this)
});

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
	return a === b
		? opts.inverse(this)
		: opts.fn(this)
});

exports.registerHelper = function (regular, fn) {
	Handlebars.registerHelper(regular, fn)
};