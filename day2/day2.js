var exports = module.exports = {};
var lib = require('../lib.js');

function main() {
	if (process.argv.length > 2) {
		exports.solve(process.argv[2], lib.display);
	} else {
		lib.getInputForDay(2, function(input) {
			exports.solve(input, lib.display);
		});
	}
}

exports.solve = function(input, display) {
	var total_area = 0;
	var total_ribbon = 0;

	var lines = input.split('\n');
	for (var line of lines) {
		if (line.length === 0) continue;

		var dims = line.split('x');

		var l = dims[0], w = dims[1], h = dims[2];

		total_area += computeArea(l, w, h);
		total_ribbon += computeRibbon(l, w, h);
	}

	display([
		'Area of wrapping paper required : ' + total_area + '.',
		'Length of ribbon required : ' + total_ribbon + '.'
	]);
}

function computeArea(l, w, h) {
	var lw = l*w, wh = w*h, hl = h*l;
	var extra = Math.min(lw, wh, hl);

	return 2*lw + 2*wh + 2*hl + extra;
}

function computeRibbon(l, w, h) {
	var lw = 2*l + 2*w, wh = 2*w + 2*h, hl = 2*h + 2*l;
	var extra = l * w * h;

	return Math.min(lw, wh, hl) + extra;
}

if (require.main === module) {
	main();
}