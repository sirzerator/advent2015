var exports = module.exports = {};
var lib = require('../lib.js');

var main = lib.main(9, exports);

exports.solve = function(input, display) {
	var locations = {}, paths = [];
	var descRegexp = /(.+?) to (.+?) = (\d{1,})/;

	for (var line of input.split('\n')) {
		var parts = line.match(descRegexp);
		if (parts) {
			if (!locations[parts[1]]) {
				locations[parts[1]] = new Location(parts[1]);
			}
			if (!locations[parts[2]]) {
				locations[parts[2]] = new Location(parts[2]);
			}

			var path = new Path(locations[parts[1]], locations[parts[2]], parseInt(parts[3]));
			if (paths.indexOf(path) === -1) {
				paths.push(path);
				locations[parts[1]].addPath(path, locations[parts[2]].name);
				locations[parts[2]].addPath(path, locations[parts[1]].name);
			}
		}
	}

	var fullPaths = [];
	var fullDistances = [];
	function enumeratePaths(length, level, explored, location) {
		if (length === level) {
			fullPaths.push(explored);
			return;
		}
		for (var path in location.paths) {
			if (explored.indexOf(path) === -1) {
				enumeratePaths(length, level + 1, explored.slice().concat([path]), locations[path]);
			}
		}
	}
	enumeratePaths(8, 0, [], locations[Object.keys(locations)[0]], fullPaths, locations);

	var shortestPath = undefined;
	var shortestDistance = Infinity;
	var longestPath = undefined;
	var longestDistance = 0;
	for (var i = 0, len = fullPaths.length; i < len; i++) {
		var distance = getPathDistance(fullPaths[i], locations);
		if (distance < shortestDistance) {
			shortestDistance = distance;
			shortestPath = fullPaths[i];
		}
		if (distance > longestDistance) {
			longestDistance = distance;
			longestPath = fullPaths[i];
		}
		fullDistances.push(distance);
	}

	display([
		'The shortest path is ' + shortestPath.join(' -> ') + ' for a total distance of ' + shortestDistance,
		'The longest path is ' + longestPath.join(' -> ') + ' for a total distance of ' + longestDistance
	]);
}

function getPathDistance(path, locations) {
	var distance = 0;
	for (var i = 0, len = path.length - 1; i < len; i++) {
		distance += locations[path[i]].paths[path[i + 1]].distance;
	}
	return distance;
}

var Path = function Path(location1, location2, distance) {
	this.location1 = location1;
	this.location2 = location2;
	this.distance = distance;
	this.valueOf = function() {
		return [this.location1.name, this.location2.name].sort.toString();
	}
	this.toString = function() {
		return location1.name + ' -> ' + location2.name + ' = ' + distance;
	}
}

var Location = function Location(name) {
	this.name = name;
	this.paths = {};
	this.addPath = function(path, target) {
		this.paths[target] = path;
	}
	this.toString = function() {
		var output = this.name + '\n';
		for (var location in this.paths) {
			output += '  To ' + location + ' : ' + this.paths[location].distance + '\n';
		}
		return output;
	}
}

if (require.main === module) {
	main();
}