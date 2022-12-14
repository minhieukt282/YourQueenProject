const http = require('http');
const url = require('url');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const HANDLER = require('./controller/router');
const NOT_FOUND_ROUTING = require('./controller/notFoundRouting');

let mimeTypes = {
    'jpg': 'images/jpeg',
    'jpeg': 'images/jpeg',
    'png': 'images/png',
    "js": 'text/javascript',
    "min.js": 'text/javascript',
    'min.css': 'text/css',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/ttf',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'eot': 'application/vnd.ms-tentobiect'
}

function getUrl(req) {
    const urlParse = url.parse(req.url, true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}

const SERVER = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    if (arrPath.length > 3) {
        trimPath = arrPath[1] + "/" + arrPath[2];
    } else {
        trimPath = arrPath[1];
    }
    let chosenHandle;
    let urlPath = url.parse(req.url).pathname;
    const fileDefence = urlPath.match("/\.js|\.css|\.png|\.jpg|\.woff|\.woff2|\.ttf|\.min.js|\.jpeg");
    if (fileDefence) {
        const extension = mimeTypes[fileDefence[0].toString().slice(1)];
        res.writeHead(200, {'Content-Type': extension});
        fs.createReadStream(__dirname + req.url).pipe(res);
    } else {
        chosenHandle = typeof HANDLER[trimPath] !== 'undefined' ? HANDLER[trimPath] : NOT_FOUND_ROUTING.showNotFound;
        if (arrPath.length === 4) {
            chosenHandle(req, res, arrPath[3]);
        } else {
            chosenHandle(req, res, arrPath[2]);
        }
    }
})

SERVER.listen(8080, () => {
    console.log("Server is running !!")
})