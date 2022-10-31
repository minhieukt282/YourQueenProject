const fs = require('fs');
const ADMIN_SERVICE = require('../../service/adminService');

class AdminPage {
    static getHtmlAdminPage(accounts, indexHtml) {
        let tbody = '';
        accounts.map((account, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${account.username}</td>
            <td>${account.id}</td>
            <td>${account.role_name}</td>
            <td>${account.status_name}</td>
   
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
            <td>${dataHistory.invoiceId}</td>
            <td>${date.yyyymmdd()}</td>
            <td>${dataHistory.userName}</td>
            <td>${dataHistory.userId}</td>
            <td>${dataHistory.provider}</td>
            <td>${dataHistory.providerId}</td>
            <td>${dataHistory.totalPrice}</td>
         
        </tr>`
        });
        indexHtml = indexHtml.replace('{history}', tbody);
        return indexHtml;

    }

    static getInfoProvider(provider, indexHtml) {

        let tbody = '';
        provider.map((dataProvider, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${dataProvider.providerName}</td>
            <td>${dataProvider.providerId}</td>
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
            <td>${date.yyyymmdd()}</td>
            <td>${dataUser.userName}</td>
            <td>${dataUser.userId}</td>
            <td>${dataUser.provider}</td>
            <td>${dataUser.providerId}</td>
            <td>${dataUser.service}</td>
            <td>${dataUser.totalPrice}</td>
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
        day.map((dataTurnoverDay, index) => {
            let date = new Date(dataTurnoverDay.day);

            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${date.yyyymmdd()}</td>
            <td>${dataTurnoverDay.totalPrice}</td>
            <td>${dataTurnoverDay.totalInvoice}</td>
             
        </tr>`
        });
        indexHtml = indexHtml.replace('{day}', tbody);
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
            <th scope="row">${index + 1}</th>
            <td>${dataTurnoverDay.year}</td>
            <td>${dataTurnoverDay.totalPrice}</td>
            <td>${dataTurnoverDay.totalInvoice}</td>
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

    turnoverDay(req, res) {
        fs.readFile('./views/admin/turnoverDay.html', "utf-8", async (err, dayData) => {
            if (err) {
                console.log(err)
            } else {
                let account = await ADMIN_SERVICE.turnoverDay();
                dayData = AdminPage.getTurnoverDay(account, dayData);
                res.writeHead(200, 'text/html');
                res.write(dayData);
                res.end()
            }
        })
    }

    turnoverMonth(req, res) {
        fs.readFile('./views/admin/turnoverMonth.html', "utf-8", async (err, monthData) => {
            if (err) {
                console.log(err)
            } else {
                let account = await ADMIN_SERVICE.turnoverMonth();
                monthData = AdminPage.getTurnoverMonth(account, monthData);
                res.writeHead(200, 'text/html');
                res.write(monthData);
                res.end()
            }
        })
    }

    turnoverYear(req, res) {
        fs.readFile('./views/admin/turnoverYear.html', "utf-8", async (err, yearData) => {
            if (err) {
                console.log(err)
            } else {
                let account = await ADMIN_SERVICE.turnoverYear();
                yearData = AdminPage.getTurnoverYear(account, yearData);
                res.writeHead(200, 'text/html');
                res.write(yearData);
                res.end()
            }
        })
    }

}

module.exports = new AdminPage();