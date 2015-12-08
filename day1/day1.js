var exports = module.exports = {};
var lib = require('../lib.js');

function main() {
	if (process.argv.length > 2) {
		exports.solve(process.argv[2], lib.display);
	} else {
		lib.getInputForDay(1, function(input) {
			exports.solve(input, lib.display);
		});
	}
}

exports.solve = function(input, display) {
	var output = [];

	var level = 0;
	var reached_first_basement = false;
	for (var i = 0, len = input.length; i < len; i++) {
		if (input[i] === '(') {
			level += 1;
		} else if (input[i] === ')') {
			level -= 1;
		}
		if (level === -1 && !reached_first_basement) {
			output.push('First basement reached after ' + (i+1) + ' steps.');
			reached_first_basement = true;
		}
	}
	output.push('Final floor is ' + level + '.');

	display(output);
}

if (require.main === module) {
	main();
}