var deployd = require('deployd');

var server = deployd({
  port: 2005,
  env: 'production',
  db: {
    host: '127.0.0.1',
    port: 27017,
    name: 'bovit'
  }
});

server.listen();

server.on('listening', function() {
  console.log("Server is listening on port 2005");
});

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});