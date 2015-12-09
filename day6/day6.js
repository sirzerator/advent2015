var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(6, exports);

exports.solve = function(input, display) {
	var onOffGrid = makeGrid(1000, 1000), brightnessGrid = makeGrid(1000, 1000, 0);

	var commands = input.split('\n');
	var commandsRegexp = /^(turn on|toggle|turn off) (\d{1,3}),(\d{1,3}) through (\d{1,3}),(\d{1,3})$/;

	for (var command of commands) {
		var commandParts = command.match(commandsRegexp);
		if (!commandParts) continue;

		var order = commandParts[1],
			x1 = parseInt(commandParts[2]),
			y1 = parseInt(commandParts[3]),
		    x2 = parseInt(commandParts[4]),
		    y2 = parseInt(commandParts[5]);

		process(order, x1, y1, x2, y2, onOffGrid, onOffLambdas);
		process(order, x1, y1, x2, y2, brightnessGrid, brightnessLambdas);
	}

	display([
		'Initially, ' + reduceGrid(onOffGrid, function(mem, val) {
			if (val === true) {
				return mem + 1;
			}
			return mem;
		}) + ' lights should be activated.',
		'But after revision, the total brightness is ' + reduceGrid(brightnessGrid, function(mem, val) {
			return mem + val;
		}) + '.'
	])
}

const onOffLambdas = {
	'turn on': function(cell) {
		return cell = true;
	},
	'turn off': function(cell) {
		return cell = false;
	},
	'toggle': function(cell) {
		return cell = !cell;
	}
}

const brightnessLambdas = {
	'turn on': function(cell) {
		return cell += 1;
	},
	'turn off': function(cell) {
		if (cell > 0) {
			return cell -= 1;
		}
		return cell;
	},
	'toggle': function(cell) {
		return cell += 2;
	}
}

function reduceGrid(grid, lambda) {
	var mem = 0;

	for (var i = 0, leni = grid.length; i < leni; i++) {
		for (var j = 0, lenj = grid[i].length; j < lenj; j++) {
			mem = lambda(mem, grid[i][j])
		}
	}

	return mem;
}

function makeGrid(x, y, val) {
	var grid = new Array(x);

	for (var i = 0, leni = grid.length; i < leni; i++) {
		grid[i] = new Array(y);
		if (val !== undefined) {
			for (var j = 0, lenj = grid[i].length; j < lenj; j++) {
				grid[i][j] = val;
			}
		}
	}

	return grid;
}

function process(order, x1, y1, x2, y2, grid, lambdas) {
	switch (order) {
	case 'turn on':
		turnOn(x1, y1, x2, y2, grid, lambdas['turn on']);
		break;
	case 'turn off':
		turnOff(x1, y1, x2, y2, grid, lambdas['turn off']);
		break;
	case 'toggle':
		toggle(x1, y1, x2, y2, grid, lambdas['toggle']);
		break;
	}
}

function turnOn(x1, y1, x2, y2, grid, lambda) {
	for (var i = x1; i <= x2; i++) {
		for (var j = y1; j <= y2; j++) {
			grid[i][j] = lambda(grid[i][j]);
		}
	}
}

function turnOff(x1, y1, x2, y2, grid, lambda) {
	for (var i = x1; i <= x2; i++) {
		for (var j = y1; j <= y2; j++) {
			grid[i][j] = lambda(grid[i][j]);
		}
	}
}

function toggle(x1, y1, x2, y2, grid, lambda) {
	for (var i = x1; i <= x2; i++) {
		for (var j = y1; j <= y2; j++) {
			grid[i][j] = lambda(grid[i][j]);
		}
	}
}

if (require.main === module) {
	main();
}
