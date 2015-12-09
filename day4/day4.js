var exports = module.exports = {};
var lib = require('../lib.js');
var crypto = require('crypto');

var main = lib.main(4, exports);

exports.solve = function(input, display) {
	input = input.replace('\n', '');
	var i = 0, five_zeroes = false, six_zeroes = false;

	do {
		var md5 = crypto.createHash('md5').update(input + i).digest("hex")
		if (md5.indexOf('00000') === 0 && !five_zeroes) {
			five_zeroes = i;
		}
		if (md5.indexOf('000000') === 0 && !six_zeroes) {
			six_zeroes = i;
		}
		i++;
	} while (!five_zeroes || !six_zeroes)

	return display([
		'The MD5 of "' + (input + five_zeroes) + '" starts with 5 zeroes (' + five_zeroes + ').',
		'The MD5 of "' + (input + six_zeroes) + '" starts with 6 zeroes (' + six_zeroes + ').'
	])
}

if (require.main === module) {
	main();
}