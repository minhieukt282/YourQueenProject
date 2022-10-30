const fs = require('fs');
const LOGIN_SERVICE = require('../../service/loginService');
const qs = require('qs')
const cookie = require("cookie");


class LoginPage {
    login(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/login/login.html', "utf-8", async (err, loginHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    LoginPage.logout(req, res);
                    res.writeHead(200, 'text/html');
                    res.write(loginHtml);
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
                    let account = qs.parse(chunkAccount)
                    let isCheckGate = await LOGIN_SERVICE.isCheckGate(account)
                    if (isCheckGate) {
                        // let expires = Date.now() + 5 * 60;
                        let dataUser = await LOGIN_SERVICE.findByUsername(account.username)
                        res.setHeader('Set-Cookie', cookie.serialize('id', `${dataUser[0].id}`, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 60*60
                        }));
                        let cookies = cookie.parse(req.headers.cookie || '');
                        console.log('cookie login', cookies)
                        if (dataUser[0].role_id === 1) {
                            res.writeHead(301, {'location': 'admin'});
                            res.end()
                        } else {
                            res.writeHead(301, {'location': 'home'});
                            res.end()
                        }
                    } else {
                        res.writeHead(301, {'location': 'login'});
                        res.end()
                    }
                }
            })
        }
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
                    let isCheckUsername = await LOGIN_SERVICE.checkAccount(accounts)
                    if (isCheckUsername) {
                        res.writeHead(301, {'location': 'register'});
                        res.end();
                    } else {
                        if (accounts.password === accounts.confirmPassword) {
                            await LOGIN_SERVICE.createAccount(accounts)
                            let newAccount = await LOGIN_SERVICE.findByUsername(accounts.username)
                            await LOGIN_SERVICE.updateUserDetails(newAccount[0].id)
                            res.writeHead(301, {'location': 'login'});
                            res.end();
                        } else {
                            res.writeHead(301, {'location': 'register'});
                            res.end();
                        }
                    }
                }
            })
        }
    }

    static logout(req, res) {
        let cookies = cookie.parse(req.headers.cookie || '');
        res.setHeader('Set-Cookie', cookie.serialize('id', `${cookies.id}`, {
            httpOnly: true,
            secure: true,
            maxAge: 0
        }));
        console.log('cookie logout', cookies)
    }
}


module.exports = new LoginPage();