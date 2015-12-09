var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(5, exports);

exports.solve = function(input, display) {
	var nice_words = 0, nice_words_new_criteria = 0;
	var words = input.split('\n');

	for (var word of words) {
		nice_words += firstCriteria(word) ? 1 : 0;
		nice_words_new_criteria += newCriteria(word) ? 1 : 0;
	}

	display([
		'There are ' + nice_words + ' nice words in the list.',
		'But there are ' + nice_words_new_criteria + ' nice words in the list with the new criteria.',
	]);
}

function firstCriteria(word) {
	if (atLeastThreeVowels(word) &&
	atLeastOneLetterTwiceInARow(word) &&
	doesNotContainBadSequences(word)) {
		return true;
	}

	return false;
}

function atLeastThreeVowels(word) {
	return word.replace(/[bcdfghjklmnpqrstvwxyz]/g, '').length >= 3;
}

function atLeastOneLetterTwiceInARow(word) {
	for (var i = 0, len = word.length; i < len; i++) {
		if (word[i] === word[i+1]) {
			return true;
		}
	}
	return false;
}

function doesNotContainBadSequences(word) {
	return word.indexOf('ab') === -1 &&
	word.indexOf('cd') === -1 &&
	word.indexOf('pq') === -1 &&
	word.indexOf('xy') === -1;
}

function newCriteria(word) {
	if (twoPairs(word) && repeatedLetter(word)) {
		return true;
	}

	return false;
}

function twoPairs(word) {
	for (var i = 0, len = word.length; i < (len - 3); i++) {
		var pair = word[i] + word[i+1];
		var lastOccurence = word.lastIndexOf(pair);
		if (lastOccurence >= i + 2) {
			return true;
		}
	}
	return false;
}

function repeatedLetter(word) {
	for (var i = 0, len = word.length; i < (len - 2); i++) {
		if (word[i] == word[i+2]) {
			return true;
		}
	}
}

if (require.main === module) {
	main();
}