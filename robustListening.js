var http = require('http');

var server = http.createServer();

server.listen(0, function() {
	console.log(server.address());
});

// Robust random listening
module.exports = function(server, port, callback) {
    var p   = port     || 0;
    var cb  = callback || function(address) { console.log('Server listening on:' + address); };

	function listen(p) {
		server.listen(p, function() {
			cb( server.address() );
		});
	}

	server.on('error', function (e) {
		// Retry only if a random port was requested, otherwise crash loudly:
		if (e.code == 'EADDRINUSE' && p === 0) {
			console.log('Random address was in use, retrying...');
			
			setTimeout(function () {
				server.close();
				listen(p);
			}, 1000);
		}
	});

	// Kick of the listening.
	listen(p);
};