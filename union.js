// Utilities.
var util = require('util');
var http = require('http');

// Load and initialize the Kinvey library.
var Kinvey = require('kinvey');
Kinvey.init({
  appKey: '<your-app-key>',
  appSecret: '<your-app-secret>'
});

// Create the server.
var server = http.createServer();

// Set default headers we sent on every response.
var headers = function(body) {
  return {
    Connection: 'close',
    'Content-Length': body.length,
    'Content-Type': 'application/json',
    'Date': new Date().toString(),
    Server: 'bookshelf'
  };
};

// Listen for incoming request.
server.on('request', function(_, response) {
  // Define the error handler for this request.
  var errorHandler = function(error) {
    var body = JSON.stringify(error);

    // I’m a teapot!
    response.writeHead(418, headers(body));
    response.write(body);
    response.end();
  };

  // Fetch all books.
  var bookCollection = new Kinvey.Collection('books');
  bookCollection.fetch({
    success: function(books) {
      // Now, fetch all genres.
      var genreCollection = new Kinvey.Collection('genres');
      genreCollection.fetch({
        success: function(genres) {
          // Merge result sets, and pass to response.
          var body = JSON.stringify({
            books: books,
            genres: genres
          });

          // Write response.
          response.writeHead(200, headers(body));
          response.write(body);
          response.end();
        },
        error: errorHandler
      });
    },
    error: errorHandler
  });

});

// Listen on http://localhost:1234
server.listen(1234);
util.puts('Server running at http://localhost:1234');