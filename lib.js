var exports = module.exports = {};
var http = require('http');

var SESSION_COOKIE = '53616c7465645f5f82ba6128fbab7db2b20aea58fae86a0937a34d6fc5e08e5259d08cb55b10a09dbeada3a409477397';

var getInput = function(url, cb) {
	var options = {
		port:80,
		host:'adventofcode.com',
		path:url,
		method:'GET',
		headers:{
			'Cookie': 'session=' + SESSION_COOKIE
		}
	}
	var body = '';
	req = http.request(options, function(res) {
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function() {
			return cb(body);
		});
	});
	req.on('error', function(e) {
	  console.log('Error: ' + e.message);
	});
	req.end();
}

exports.main = function(i, day) {
	return (function() {
		if (process.argv.length > 2) {
			day.solve(process.argv[2], exports.display);
		} else {
			exports.getInputForDay(i, function(input) {
				day.solve(input, exports.display);
			});
		}
	});
}

exports.display = function(lines) {
	console.log(lines.join("\n"));
}

exports.getInputForDay = function(i, cb) {
	getInput('http://adventofcode.com/day/' + i + '/input', cb);
}
