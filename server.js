//const https = require('https');
const http = require('http');
const app = require('./server/routes.js');
//const fs = require('fs');

/*
var options = {
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')
};
*/

const port = process.env.PORT || 80;
//const contentServer = http.createServer(options,contentApp);
const server = http.createServer(app);
server.listen(port);
