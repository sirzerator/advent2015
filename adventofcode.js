var lib = require('./lib.js');
var async = require('async');

SOLVED_UP_TO_DAY = 5;
for (var i = 1, last = SOLVED_UP_TO_DAY; i <= last; i++) {
	global['day' + i] = require('./day' + i + '/day' + i + '.js');
}


function main() {
	var calls = [];
	for (var i = 1, last = SOLVED_UP_TO_DAY; i <= last; i++) {
		(function(j) {
			calls.push(function(done) {
				lib.getInputForDay(j, function(input) {
					console.time('day' + j);
					global['day' + j].solve(input, function(output) {
						console.log('=== DAY ' + j + ' ===');
						lib.display(output);
						console.timeEnd('day' + j);
						done();
					});
				});
			})
		}(i));
	}
	async.series(calls);
}

if (require.main === module) {
	main();
}