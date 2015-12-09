var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(3, exports);

exports.solve = function(input, display) {
	var steps = input.split('');
	var loneSanta = followPathAlone(steps);
	var santaAndRobot = followPathWithRobot(steps);

	display([
		'Santa visits ' + loneSanta + ' houses.',
		'Santa, with the help of his robot, visits ' + santaAndRobot + ' houses.'
	]);
}

function followPathAlone(steps) {
	var housesVisited = 0,
	    visitedHouses = {},
	    pos = {
	    	x: 0,
	    	y: 0
	    };

	for (var step of steps) {
		housesVisited += visitHouse(step, pos, visitedHouses);
	}

	return housesVisited;
}

function followPathWithRobot(steps) {
	var housesVisited = 0,
	    visitedHouses = {},
	    robotPos = {
	    	x: 0,
	    	y: 0
	    },
	    santaPos = {
	    	x: 0,
	    	y: 0
	    };

	for (var i = 0, len = steps.length; i < (len - 1); i += 2) {
		housesVisited += visitHouse(steps[i], santaPos, visitedHouses);
		housesVisited += visitHouse(steps[i+1], robotPos, visitedHouses);
	}

	return housesVisited;
}

function visitHouse(step, pos, visitedHouses) {
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

	if (!visitedHouses[pos.x + 'x' + pos.y]) {
		visitedHouses[pos.x + 'x' + pos.y] = true;
		return 1;
	}

	return 0;
}

if (require.main === module) {
	main();
}