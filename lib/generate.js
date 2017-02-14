var chalk = require('chalk');
var path = require('path');
var tildify = require('tildify');
var getOptions = require('./options');
var Metalsmith = require('metalsmith');
var ask = require('./ask');
var home = require('user-home');
var logger = require('./logger');
var async = require('async');
var downloadGit = require('download-git-repo');
var ora = require('ora');
var inquirer = require('inquirer');
var Handlebars = require('./handlebars');
var render = require('consolidate').handlebars.render;


module.exports = function generate(done) {
	var opts = getOptions();
	var projectInfo = {};


	// var data = Object.assign(metalsmith.metadata(), {
	// 	destDirName: name,
	// 	inPlace: dest === process.cwd(),
	// 	noEscape: true
	// });
	askInitialQ(opts.prompts, projectInfo, function () {
		logger.success('ProjectInfo input complete!');

		var template = projectInfo.template;
		var tmp = path.join(home, '.zense', template.replace(/\//g, '-'));
		template = "HSUCHING/" + template;
		// if (program.offline) {
		// 	console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`);
		// 	template = tmp;
		// }
		var dest = path.resolve(projectInfo.name || '.');
		download(template, tmp, function () {
			var metalSmith = Metalsmith(path.join(tmp, 'template'));
			var data = Object.assign(metalSmith.metadata(), projectInfo);
			metalSmith
				.use(renderTemplateFiles())
				.clean(false)
				.source('.')
				.destination(dest)
				.build(function (err, files) {
					done(err);
					console.log("Build complete");
					// if (typeof opts.complete === 'function') {
					// 	var helpers = {chalk, logger, files};
					// 	opts.complete(data, helpers);
					// } else {
					// 	logMessage(opts.completeMessage, data);
					// }
				})
		});
		//
		//
		//
		// 	// var data=Object.assign(metalSmith.metadata(),{
		// 	// 	destDirName:projectInfo.name,
		// 	// 	inPlace:dest===
		// 	// });
	});

	// return data;
};


function download(template, tmp, done) {
	var spinner = ora('downloading template');
	spinner.start();
	downloadGit(template, tmp, {clone: false}, function (err) {
		spinner.stop();
		if (err) {
			logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
		} else {
			logger.success('Success to download repo ' + template);
			done();
		}
	});
}

function askInitialQ(prompts, userInfo, done) {
	ask(prompts, userInfo, done);
}

function askQuestions(prompts) {
	return function (files, metalsmith, done) {
		ask(prompts, metalsmith.metadata(), done)
	}
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles() {
	return function (files, metalsmith, done) {
		var keys = Object.keys(files);
		var metalsmithMetadata = metalsmith.metadata();
		async.each(keys, function (file, next) {
			var str = files[file].contents.toString();
			// do not attempt to render files that do not have mustaches
			if (!/{{([^{}]+)}}/g.test(str)) {
				return next();
			}
			render(str, metalsmithMetadata, function (err, res) {
				if (err) return next(err);
				files[file].contents = new Buffer(res);
				next();
			});
		}, done);
	}
}


function logMessage(message, data) {
	if (!message) return;
	render(message, data, function (err, res) {
		if (err) {
			console.error('\n   Error when rendering template complete message: ' + err.message.trim())
		} else {
			console.log('\n' + res.split(/\r?\n/g).map(function (line) {
					return '   ' + line
				}).join('\n'))
		}
	})
}