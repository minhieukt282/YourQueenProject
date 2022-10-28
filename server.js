const http = require('http');
const url = require('url');
const HANDLER = require('./controller/router');
const NOT_FOUND_ROUTING = require('./controller/notFoundRouting');

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
    if (typeof HANDLER[trimPath] === 'undefined') {
        chosenHandle = NOT_FOUND_ROUTING.showNotFound
    } else {
        chosenHandle = HANDLER[trimPath];
    }
    chosenHandle(req, res, +arrPath[3]);
})

SERVER.listen(3000, () => {
    console.log("Server is running !!")
})