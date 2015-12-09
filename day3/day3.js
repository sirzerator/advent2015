var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(3, exports);

exports.solve = function(input, display) {
	var steps = input.split('');
	var lone_santa = followPathAlone(steps);
	var santa_and_robot = followPathWithRobot(steps);

	display([
		'Santa visits ' + lone_santa + ' houses.',
		'Santa, with the help of his robot, visits ' + santa_and_robot + ' houses.'
	]);
}

function followPathAlone(steps) {
	var houses_visited = 0,
	    visited_houses = {},
	    pos = {
	    	x: 0,
	    	y: 0
	    };

	for (var step of steps) {
		houses_visited += visitHouse(step, pos, visited_houses);
	}

	return houses_visited;
}

function followPathWithRobot(steps) {
	var houses_visited = 0,
	    visited_houses = {},
	    robot_pos = {
	    	x: 0,
	    	y: 0
	    },
	    santa_pos = {
	    	x: 0,
	    	y: 0
	    };

	for (var i = 0, len = steps.length; i < (len - 1); i += 2) {
		houses_visited += visitHouse(steps[i], santa_pos, visited_houses);
		houses_visited += visitHouse(steps[i+1], robot_pos, visited_houses);
	}

	return houses_visited;
}

function visitHouse(step, pos, visited_houses) {
	switch (step) {
	case '>':
		pos.x += 1;
		break;
	case '<':
		pos.x -= 1;
		break;
	case '^':
		pos.y += 1;
		break;
	case 'v':
		pos.y -= 1;
		break;
	default:
		break;
	}

	if (!visited_houses[pos.x + 'x' + pos.y]) {
		visited_houses[pos.x + 'x' + pos.y] = true;
		return 1;
	}

	return 0;
}

if (require.main === module) {
	main();
}