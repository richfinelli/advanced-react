// let's go!
//This si the file that gets run by node. It basically uses the createServer.js to start the server
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

//todo:
//use express middleware to handle cookies (JWT) JSON Web Tokens
//use express middleware to populate current users 

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server now running on http://localhost:${deets.port}`); 
})