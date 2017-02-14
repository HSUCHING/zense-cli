/**
 * Created by chinghsu on 17/2/8.
 */
module.exports = {
	"helpers": {
		"if_or": function (v1, v2, options) {
			if (v1 || v2) {
				return options.fn(this);
			}

			return options.inverse(this);
		}
	},
	"prompts": {
		"name": {
			"type": "string",
			"required": true,
			"message": "Project name"
		},
		"description": {
			"type": "string",
			"required": false,
			"message": "Project description",
			"default": "A Zense project"
		},
		"author": {
			"type": "string",
			"message": "Author"
		},
		"template": {
			"type": "list",
			"message": "Zense Template",
			choices: [{
				"name": "Ethicall Test",
				"value": "ETCTest_Template",
				"short": "ETCTest_Template"
			}, {
				"name": "Ethicall Development",
				"value": "ETCTest_Template",
				"short": "ETCTest_Template"
			}, {
				"name": "Ethicall Tools",
				"value": "ETCTest_Template",
				"short": "ETCTest_Template"
			}]
		},
		"testConfig": {
			"type": "rawlist",
			"message": "Select Zense Test Library",
			choices: [{
				"name": "Karam + Mocha",
				"value": "Mocha",
				"short": "Mocha"
			}, {
				"name": "Karam + Jasmine",
				"value": "Jasmine",
				"short": "Jasmine"
			}, {
				"name": "Karam + JUnit",
				"value": "JUnit",
				"short": "JUnit"
			}]
		},
		// "build": {
		// 	"type": "list",
		// 	"message": "ETCZense build",
		// 	"choices": [
		// 		{
		// 			"name": "Runtime + Compiler: recommended for most users",
		// 			"value": "standalone",
		// 			"short": "standalone"
		// 		},
		// 		{
		// 			"name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
		// 			"value": "runtime",
		// 			"short": "runtime"
		// 		}
		// 	]
		// },
		"eslint": {
			"type": "confirm",
			"message": "Use ESLint to lint your code?"
		}
		// "lintConfig": {
		// 	"when": "lint",
		// 	"type": "list",
		// 	"message": "Pick an ESLint preset",
		// 	"choices": [
		// 		{
		// 			"name": "Standard (https://github.com/feross/standard)",
		// 			"value": "standard",
		// 			"short": "Standard"
		// 		},
		// 		{
		// 			"name": "AirBNB (https://github.com/airbnb/javascript)",
		// 			"value": "airbnb",
		// 			"short": "AirBNB"
		// 		},
		// 		{
		// 			"name": "none (configure it yourself)",
		// 			"value": "none",
		// 			"short": "none"
		// 		}
		// 	]
		// },
		// "unit": {
		// 	"type": "confirm",
		// 	"message": "Setup unit tests with Karma + Mocha?"
		// }

	},
	"filters": {
		".eslintrc.js": "lint",
		".eslintignore": "lint",
		"config/test.env.js": "unit || e2e",
		"test/unit/**/*": "unit",
		"build/webpack.test.conf.js": "unit",
		"test/e2e/**/*": "e2e",
		"src/router/**/*": "router"
	},
	"completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};