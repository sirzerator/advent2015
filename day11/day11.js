var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(11, exports);

const ELFABET = 'abcdefghjkmnpqrstuvwxyz';
const THREE_LETTERS_STRAIGHTS = new RegExp((function() {
	var straights = [];
	for (var i = 0, len = ELFABET.length; i < len - 2; i++) {
		straights.push(ELFABET[i] + ELFABET[i+1] + ELFABET[i+2]);
	}
	return straights.join('|');
})());

exports.solve = function(input, display) {
	var nextPassword;

	display([
		'The next password is ' + (nextPassword = incrementPassword(input.replace(/\n/g, ''))) + ' .',
		'And the one after is ' + (incrementPassword(nextPassword)) + ' .'
	]);
}

function incrementPassword(word) {
	var newPassword, numericalPassword = parseInt(word, 36);

	do {
		numericalPassword++;
		newPassword = (numericalPassword).toString(36);
	} while(!passwordIsValid(newPassword))

	return newPassword;
}

function passwordIsValid(password) {
	return noExcludedChars(password) && twoPairs(password) && oneStraight(password);
}

function noExcludedChars(word) {
	return !/[iol0-9	]/i.test(word);
}

function twoPairs(word) {
	var pairs = 0;

	for (var i = 0, len = word.length - 1; i < len; i++) {
		if (word[i] === word[i+1]) {
			pairs++;
			i++;
		}
		if (pairs >= 2) return true;
	}

	return false;
}

function oneStraight(word) {
	return THREE_LETTERS_STRAIGHTS.test(word);
}

if (require.main === module) {
	main();
}
