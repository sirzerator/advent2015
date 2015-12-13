var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(7, exports);

exports.solve = function(input, display) {
	var solutionMatrix1 = sm1 = {
		one: 1
	};
	var solutionMatrix2 = sm2 = {
		one: 1
	};

	var commands1 = input.split('\n');
	for (var command of commands1) {
		if (!evaluate(command, sm1)) commands1.push(command);
	}
	var commands2 = input.split('\n');
	for (var command of commands2) {
		if (!evaluate(command, sm2, function(parts) {
			if (parts[2] === 'b') {
				parts[1] = sm1.a;
			}
		})) commands2.push(command);
	}

	display([
		sm1.a + ' is provided on wire A.',
		sm2.a + ' is provided on wire A after putting in B the output of A in the first run.'
	]);
}

function evaluate(command, sm, transform) {
	var simpleAssignment = /^([a-z0-9]{1,}) -> ([a-z]{1,})$/;
	var andOr = /([a-z]{1,}|1) (AND|OR) ([a-z]{1,}) -> ([a-z]{1,})$/;
	var shift = /([a-z]{1,}) (LSHIFT|RSHIFT) (\d{1,}) -> ([a-z]{1,})$/;
	var not = /NOT ([a-z]{1,}) -> ([a-z]{1,})$/;

	if ((parts = command.match(simpleAssignment)) && !applySimpleAssignment(parts, sm, transform) ||
	    (parts = command.match(andOr)) && !applyAndOr(parts, sm) ||
	    (parts = command.match(shift)) && !applyShift(parts, sm) ||
	    (parts = command.match(not)) && !applyNot(parts, sm)) {
		return false;
	}

	return true;
}

function applySimpleAssignment(parts, sm, transform) {
	if (typeof transform === 'function') {
		transform(parts);
	}

	var fromInt = parseInt(parts[1], 10);

	if (isNaN(fromInt)) {
		if (sm[parts[1]] === undefined) {
			return false;
		}

		eval('sm.' + parts[2] + ' = sm.' + parts[1]);
	} else {
		eval('sm.' + parts[2] + ' = ' + parts[1]);
	}

	return true;
}

function applyAndOr(parts, sm) {
	if (parts[1] === '1') {
		parts[1] = 'one';
	}

	if (sm[parts[1]] === undefined || sm[parts[3]] === undefined) {
		return false;
	}

	switch (parts[2]) {
	case 'AND':
		eval('sm.' + parts[4] + ' = (sm.' + parts[1] + ' & sm.' + parts[3] + ') & 131071');
		break;
	case 'OR':
		eval('sm.' + parts[4] + ' = (sm.' + parts[1] + ' | sm.' + parts[3] + ') & 131071 - 65536');
		break;
	}

	return true;
}

function applyShift(parts, sm) {
	if (sm[parts[1]] === undefined) {
		return false;
	}

	switch (parts[2]) {
	case 'LSHIFT':
		eval('sm.' + parts[4] + ' = (sm.' + parts[1] + ' << ' + parts[3] + ') & 131071 - 65536');
		break;
	case 'RSHIFT':
		eval('sm.' + parts[4] + ' = (sm.' + parts[1] + ' >>> ' + parts[3] + ') & 131071 - 65536');
		break;
	}

	return true;
}

function applyNot(parts, sm) {
	if (sm[parts[1]] === undefined) {
		return false;
	}

	eval('sm.' + parts[2] + ' = ~ sm.' + parts[1] + ' & 131071 - 65536');

	return true;
}

if (require.main === module) {
	main();
}
