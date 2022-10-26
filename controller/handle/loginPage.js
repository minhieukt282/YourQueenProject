const fs = require('fs');
const LOGIN_SERVICE = require('../../service/loginService');
const TOKEN_SERVICE = require('../../service/tokenService')
const qs = require('qs')

class LoginPage {
    login(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/login/login.html', "utf-8", async (err, loginHtml) => {
                if (err) {
                    console.log(err)
                } else {
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
                        let expires = Date.now() + 5 * 60;
                        let dataUser = await LOGIN_SERVICE.findByUsername(account.username)
                        let tokenId = TOKEN_SERVICE.createRandomString(20)
                        let dataContent = {
                            id: `${dataUser[0].id}`,
                            role_id: `${dataUser[0].role_id}`,
                            status_id: `${dataUser[0].status_id}`
                        }
                        let tokenSession = "{\"id\":\"" + dataContent.id + "\",\"role_id\":\"" + dataContent.role_id + "\",\"status_id\":\"" + dataContent.status_id + "\",\"token_id\":\"" + tokenId + "\",\"expires\":" + expires + "}";
                        await TOKEN_SERVICE.createTokenSession(tokenSession, tokenId);
                        await TOKEN_SERVICE.insertTokenId(dataContent.id, tokenId)
                        if (dataUser[0].role_id === 1) {
                            res.writeHead(301, {'location': 'admin'});
                            res.end()
                        } else {
                            res.writeHead(301, {'location': 'home'});
                            res.end()
                        }
                    } else {
                        console.log('incorrect!!!')
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
                        console.log("ten da trung")
                        console.log("______________")
                        res.writeHead(301, {'location': 'register'});
                        res.end();
                    } else {
                        if (accounts.password === accounts.confirmPassword) {
                            await LOGIN_SERVICE.createAccount(accounts)
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

module.exports = new LoginPage();