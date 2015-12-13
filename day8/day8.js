var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(8, exports);

exports.solve = function(input, display) {
	var charsInString = 0, charsInMemory = 0, charsInEncodedString = 0;

	var words = input.split('\n');
	for (var word of words) {
		if (word.length === 0) continue;
		charsInString += word.length;

		eval('var parsedWord = ' + word + ';');
		charsInMemory += parsedWord.length;

		var encodedWord = '"' + word.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
		charsInEncodedString += encodedWord.length;
	}

	display([
		charsInString + ' characters in the string translating to ' + charsInMemory + ' characters in memory (' + (charsInString - charsInMemory) + ').',
		'After escaping, the string occupies ' + charsInEncodedString + ' characters (' + (charsInEncodedString - charsInString) + ' more than before).'
	])
}

if (require.main === module) {
	main();
}
