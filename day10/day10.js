var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(10, exports);

String.prototype.repeat = function(num) {
    return new Array(num).join(this);
}

exports.solve = function(input, display) {
	var at40, at50, iterations = 50;

	var output = input.replace('\n', '');
	for (var i = 0; i < iterations; i++) {
		output = applyLookAndSay(output);
		if (i+1 === 40) {
			at40 = output;
		} else if (i+1 === 50) {
			at50 = output;
		}
	}

	display([
		'Length after 40 iterations : ' + at40.length + ' .',
		'Length after 50 iterations : ' + at50.length + ' .'
	]);
}

function applyLookAndSay(line) {
	return convertBlocks(
		splitBlocks(line)
	).join('');
}

function splitBlocks(line) {
	var chars = line.split('');
	var blocks = [];
	var currentChar = '', currentLength = 0;

	for (var i = 0, len = chars.length; i < len; i++) {
		if (chars[i] !== currentChar) {
			if (currentLength > 0) {
				blocks.push(currentChar.repeat(currentLength));
			}
			currentChar = chars[i];
			currentLength = 1;
		}
		currentLength++;
	}
	blocks.push(currentChar.repeat(currentLength));

	return blocks;
}

function convertBlocks(blocks) {
	for (var i = 0, len = blocks.length; i < len; i++) {
		blocks[i] = blocks[i].length + blocks[i][0];
	}
	return blocks;
}

if (require.main === module) {
	main();
}
