var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(12, exports);

exports.solve = function(input, display) {
	var numbersRegexp = /-?\d+/g;

	var numbers = input.match(numbersRegexp);

	var total = numbers.reduce(function(mem, val) {
		return mem + parseInt(val);
	}, 0);

	var jsonObject = JSON.parse(input);
	var realSum = sumParts(jsonObject, 0);

	display([
		'Counting just the numbers, they all add up to ' + total + ' .',
		'But when taking into account the "red" property, they add up to ' + realSum + ' .'
	])
}

function sumParts(object, total) {
	var value, sum = 0;

	for (var i in object) {
		if (object[i] === 'red' && !Array.isArray(object)) {
			return total;
		}

		if (typeof object[i] === 'object') {
			sum += sumParts(object[i], total);
		} else if (typeof object[i] === 'number') {
			sum += object[i];
		}
	}

	return sum;
}

if (require.main === module) {
	main();
}
