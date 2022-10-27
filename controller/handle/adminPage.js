const fs = require('fs');
const ADMIN_SERVICE = require('../../service/adminService');

// const qs = require('qs')
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
    }
}

module.exports = new AdminPage();