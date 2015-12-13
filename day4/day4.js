var exports = module.exports = {};
var lib = require('../lib.js');
var crypto = require('crypto');

var main = lib.main(4, exports);

exports.solve = function(input, display) {
	input = input.replace('\n', '');
	var i = 0, fiveZeroes = false, sixZeroes = false;

	do {
		var md5 = crypto.createHash('md5').update(input + i).digest("hex")
		if (md5.indexOf('00000') === 0 && !fiveZeroes) {
			fiveZeroes = i;
		}
		if (md5.indexOf('000000') === 0 && !sixZeroes) {
			sixZeroes = i;
		}
		i++;
	} while (!fiveZeroes || !sixZeroes)

	return display([
		'The MD5 of "' + (input + fiveZeroes) + '" starts with 5 zeroes (' + fiveZeroes + ').',
		'The MD5 of "' + (input + sixZeroes) + '" starts with 6 zeroes (' + sixZeroes + ').'
	]);
}

if (require.main === module) {
	main();
}
