/**
 * Copyright 2013 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Utilities.
var util = require('util');
var http = require('http');

// Load and initialize the Kinvey library.
var Kinvey = require('kinvey');
Kinvey.init({
  appKey       : 'App Key',
  appSecret    : 'App Secret',
  masterSecret : 'Master Secret'
});

// Create the server.
var server = http.createServer();

// Set default headers we sent on every response.
var headers = function(body) {
  return {
    Connection       : 'close',
    'Content-Length' : body.length,
    'Content-Type'   : 'application/json',
    'Date'           : new Date().toString(),
    Server           : 'bookshelf'
  };
};

// Listen for incoming request.
server.on('request', function(_, response) {
  // Fetch all books and genres in parallel.
  var promise = Kinvey.Defer.all([
    Kinvey.DataStore.find('books'),
    Kinvey.DataStore.find('genres')
  ]);
  promise.then(function(responses) {
    // Merge results sets, and pass to the response.
    var body = JSON.stringify({
      books  : responses[0],
      genres : responses[1]
    });
    response.writeHead(200, headers(body));
    response.write(body);
    response.end();
  }, function(error) {
    // Pass error to the response.
    var body = JSON.stringify(error);
    response.writeHead(500, headers(body));
    response.write(body);
    response.end();
  });

});

// Listen on http://localhost:1234
server.listen(1234);
util.puts('Server running at http://localhost:1234');