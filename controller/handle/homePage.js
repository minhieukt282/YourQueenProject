const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const qs = require('qs')

class HomePage {
    homePage(req, res) {

    }

    login(req, res) {
        console.log("login")
    }

    register(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/register/register.html', "utf-8", async (err, registerHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(registerHtml);
                    res.end()
                }
            })
        } else {
            let chunkAccount = '';
            req.on('data', chunk => {
                chunkAccount += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let accounts = qs.parse(chunkAccount);
                    let isCheckUsername = await HOME_SERVICE.checkAccount(accounts)
                    if (isCheckUsername) {
                        console.log("ten da trung")
                        console.log("______________")
                        res.writeHead(301, {'location': 'register'});
                        res.end();
                    } else {
                        if (accounts.password === accounts.confirmPassword) {
                            await HOME_SERVICE.createAccount(accounts)
                            res.writeHead(301, {'location': 'login'});
                            res.end();
                        } else {
                            console.log('Password incorrect')
                            console.log("______________")
                            res.writeHead(301, {'location': 'register'});
                            res.end();
                        }
                    }
                }
            })
        }
    }
}

module.exports = new HomePage();
