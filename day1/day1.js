var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(1, exports);

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