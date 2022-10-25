const server = require('http');
const http = server.createServer((req,res) => {
    console.log(__dirname);
    res.end();
});
http.listen(8080, () => {
    console.log('Localhost is running at 8080')
});
