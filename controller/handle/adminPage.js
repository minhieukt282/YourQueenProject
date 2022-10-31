const fs = require('fs');
const ADMIN_SERVICE = require('../../service/adminService');
const LOGIN_SERVICE = require('../../service/loginService');
const PROFILE_PAGE = require('./profilePage');

const qs = require("qs");

const cookie = require("cookie");
const HOME_SERVICE = require("../../service/homeService");
const PROFILE_SERVICE = require("../../service/profileService");

class AdminPage {
    static getHtmlAdminPage(accounts, indexHtml) {
        let tbody = '';
        accounts.map((account, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${account.username}</td>
            <td>${account.role_name}</td>
            <td>${account.status_name}</td>
            <td>${account.name}</td>
            <td>${account.birthday}</td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{accounts}', tbody);
        return indexHtml;

    };

    static getHistoryTrade(history, indexHtml) {
        Date.prototype.yyyymmdd = function () {
            let mm = this.getMonth() + 1;
            let dd = this.getDate();
            return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('-');
        };

        let tbody = '';
        history.map((dataHistory, index) => {
            let date = new Date(dataHistory.timeTrade);
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${dataHistory.user}</td>
            <td>${dataHistory.userId}</td>
            <td>${dataHistory.provider}</td>
            <td>${dataHistory.providerId}</td>
            <td>${date.yyyymmdd()}</td>
            <td>${dataHistory.totalPrice}</td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{history}', tbody);
        return indexHtml;

    }

    static getInfoProvider(provider, indexHtml) {
        Date.prototype.yyyymmdd = function () {
            let mm = this.getMonth() + 1;
            let dd = this.getDate();
            return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('-');
        };
        let tbody = '';
        provider.map((dataProvider, index) => {
            let date = new Date(dataProvider.time);

            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${dataProvider.providerName}</td>
            <td>${dataProvider.providerId}</td>
            <td>${date.yyyymmdd()}</td>
            <td>${dataProvider.totalPrice}</td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{provider}', tbody);
        return indexHtml;

    }

    static getInfoUser(users, indexHtml) {
        Date.prototype.yyyymmdd = function () {
            let mm = this.getMonth() + 1;
            let dd = this.getDate();
            return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('-');
        };
        let tbody = '';
        users.map((dataUser, index) => {
            let date = new Date(dataUser.timeTrade);
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${dataUser.userName}</td>
            <td>${dataUser.invoiceId}</td>
            <td>${dataUser.userId}</td>
            <td>${dataUser.service}</td>
            <td>${dataUser.provider}</td>
            <td>${date.yyyymmdd()}</td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{users}', tbody);
        return indexHtml;

    }

    static getTurnoverDay(day, indexHtml) {
        Date.prototype.yyyymmdd = function () {
            let mm = this.getMonth() + 1;
            let dd = this.getDate();
            return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('-');
        };
        let tbody = '';
        day.map((element) => {
            let date = new Date(element.date);
            tbody += ` <div class="row">
          <div class="col-2">
            ${element.invoice_id}
          </div>
          <div class="col">
             ${date.yyyymmdd()}
          </div>
          <div class="col">
            ${element.total}
          </div>
        </div>`
        });
        indexHtml = indexHtml.replace('{bill}', tbody);
        return indexHtml;
    }

    static getTurnoverMonth(month, indexHtml) {
        let tbody = '';
        month.map((dataTurnoverMonth, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${dataTurnoverMonth.month}</td>
            <td>${dataTurnoverMonth.year}</td>
            <td>${dataTurnoverMonth.totalPrice}</td>
            <td>${dataTurnoverMonth.totalInvoice}</td>

        </tr>`
        });
        indexHtml = indexHtml.replace('{month}', tbody);
        return indexHtml;
    }

    static getTurnoverYear(year, indexHtml) {
        let tbody = '';
        year.map((dataTurnoverDay, index) => {
            tbody += `<tr>
            <div class="row">
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
  </div>
        </tr>`
        });
        indexHtml = indexHtml.replace('{year}', tbody);
        return indexHtml;
    }

    adminPage(req, res) {
        fs.readFile('./views/admin/admin.html', "utf-8", async (err, adminData) => {
            if (err) {
                console.log(err)
            } else {
                let account = await ADMIN_SERVICE.showAll();
                console.log(account);
                adminData = AdminPage.getHtmlAdminPage(account, adminData);
                res.writeHead(200, 'text/html');
                res.write(adminData);
                res.end()
            }
        })
    };

    historyTradePage(req, res) {
        fs.readFile('./views/admin/tradeHistory.html', "utf-8", async (err, historyData) => {
            if (err) {
                console.log(err)
            } else {

                let account = await ADMIN_SERVICE.showHistoryTrade();
                historyData = AdminPage.getHistoryTrade(account, historyData);
                res.writeHead(200, 'text/html');
                res.write(historyData);
                res.end()
            }
        })
    }

    providerPage(req, res) {
        fs.readFile('./views/admin/manageProvider.html', "utf-8", async (err, providerData) => {
            if (err) {
                console.log(err)
            } else {
                let account = await ADMIN_SERVICE.showProvider();
                providerData = AdminPage.getInfoProvider(account, providerData);
                res.writeHead(200, 'text/html');
                res.write(providerData);
                res.end()
            }
        })
    }

    userPage(req, res) {
        fs.readFile('./views/admin/manageUser.html', "utf-8", async (err, userData) => {
            if (err) {
                console.log(err)
            } else {
                let account = await ADMIN_SERVICE.showUser();
                userData = AdminPage.getInfoUser(account, userData);
                res.writeHead(200, 'text/html');
                res.write(userData);
                res.end()
            }
        })
    }

    async changePassword(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        let isAdmin = await LOGIN_SERVICE.checkAdmin(req)
        console.log("chang password", isStatus)
        console.log("is admin", isAdmin)
        if (isStatus === true && isAdmin === true) {
            if (req.method === 'GET') {
                fs.readFile('./views/admin/changePassword.html', "utf-8", async (err, changePasswordHtml) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.writeHead(200, 'text/html');
                        res.write(changePasswordHtml);
                        res.end()
                    }
                })
            } else {
                let account = '';
                req.on('data', chunk => {
                    account += chunk
                });
                req.on('end', async (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let newAccount = qs.parse(account)
                        let cookies = cookie.parse(req.headers.cookie || '');
                        console.log("newPassword", newAccount)
                        console.log("cookie", cookies)
                        let listAccount = await LOGIN_SERVICE.findById(cookies.id)
                        console.log("list account", listAccount)
                        if (listAccount[0].password === newAccount.password) {
                            let changeDone = await ADMIN_SERVICE.changePassword(newAccount.newPassword, cookies.id)
                            res.writeHead(301, {'location': 'admin'})
                            res.end()
                        } else {
                            console.log("sai mat khau")
                            res.writeHead(301, {'location': 'changePassword'})
                            res.end()
                        }
                    }
                })
            }
        } else {
            res.writeHead(301, {'location': 'login'});
            res.end();
        }
    }

    async userChangePassword(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        console.log("isStatus change pass: ", isStatus)
        console.log("chang password", isStatus)
        if (isStatus === true) {
            if (req.method === 'GET') {
                fs.readFile('./views/myProfile/userChangePass.html', "utf-8", async (err, changePasswordHtml) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let cookies = cookie.parse(req.headers.cookie || '');
                        let userInfo = await PROFILE_SERVICE.findById(cookies.id)
                        console.log(userInfo)
                        //dang loi
                        // changePasswordHtml = ProfilePage.getDataMyProfile(changePasswordHtml, userInfo);
                        res.writeHead(200, 'text/html');
                        res.write(changePasswordHtml);
                        res.end()
                    }
                })
            } else {
                let account = '';
                req.on('data', chunk => {
                    account += chunk
                });
                req.on('end', async (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let newAccount = qs.parse(account)
                        let cookies = cookie.parse(req.headers.cookie || '');
                        console.log("newPassword", newAccount)
                        console.log("cookie", cookies)
                        let listAccount = await LOGIN_SERVICE.findById(cookies.id)
                        console.log("list account", listAccount)
                        if (listAccount[0].password === newAccount.password) {
                            let changeDone = await ADMIN_SERVICE.changePassword(newAccount.newPassword, cookies.id)
                            res.writeHead(301, {'location': 'myProfile'})
                            res.end()
                        } else {
                            console.log("sai mat khau")
                            res.writeHead(301, {'location': 'userChangePassword'})
                            res.end()
                        }
                    }
                })
            }
        } else {
            res.writeHead(301, {'location': 'login'});
            res.end();
        }
    }

    showBill(req, res) {
        fs.readFile('./views/admin/bill.html', 'utf-8', async (err, dataBillHtml) => {
            if (err) {
                console.log(err);
            } else {
                let arrBill = await ADMIN_SERVICE.getBillDay()
                let billHTML = await AdminPage.getTurnoverDay(arrBill, dataBillHtml)
                res.writeHead(200, 'text/html');
                res.write(billHTML);
                res.end();
            }
        })
    }

}


module.exports = new AdminPage();