const http = require('http');
const cookie = require('cookie');

const server = http.createServer(function (req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('name', '20', {
        httpOnly: true,
        maxAge: 60 // 60s
    }));

    let cookies = cookie.parse(req.headers.cookie || '');
    console.log(cookies)
    res.end(`Hello World\n`);
})
server.listen(3001, () => {
    console.log("Server is running !!")
})
