# Union-Nodejs
The Union sample application is a script which performs two requests against Kinvey, and serves the result as a single response to the client. The client can now access data from two requests using a single API call. This is useful:

* If you want to perform heavy calculations on data. Executing the calculations on the server-side will be beneficial for the client in terms of power consumption, memory allocation and the like.
* If you’re building an application that uses the `Master Secret` to access to all data, using Node.js to build your app is the recommended approach.

## Run It
After downloading or cloning the repository:

* Make sure you have installed [Node.js](http://nodejs.org) and [npm](https://npmjs.org).
* Run `npm install` to install the Kinvey node module.
* Replace `App Key` and `App Secret` (`union.js`) with your application credentials. `Master Secret` is optional.
* Run `node union.js`.
* Point your browser to `http://localhost:1234`. Adjust the hostname if necessary.

## Functionality
This application demonstrates:

* Data Storage

## Architecture
The project uses the [package.json packaging format](https://npmjs.org/doc/json.html). This means the project can be easily used by other node projects, and vice versa. In the `package.json`, Kinvey’s JavaScript library is added as dependency.

The file `union.js` contains all code. It initializes Kinvey for use in your app, and listens for clients to connect. For every client, it performs two requests against Kinvey, and serves this as a single response.