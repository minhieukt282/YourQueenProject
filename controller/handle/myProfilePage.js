const fs = require('fs');
const MY_PROFILE_PAGE = require('../../service/MyProfileService');
const qs = require('qs')

class MyProfilePage {

    static async replaceStatus(status) {
        let option = ''
        for (const item of status) {
            option += ` <option value="${item.status_name}">${item.status_name}</option>`
        }
        return option;
    }

    editStatus(req, res) {
        if (req.method === "GET") {
            fs.readFile('./views/myProfile/myProfile.html', "utf-8", async (err, editStatus1) => {
                if (err) {
                    console.log(err);
                } else {
                    let status = await MY_PROFILE_PAGE.showStatus();
                    let statusHTML = await MyProfilePage.replaceStatus(status)
                    editStatus1 = editStatus1.replace('{status}', statusHTML);
                    res.writeHead(200, 'text/html');
                    res.write(editStatus1);
                    res.end();
                }
            });
        } else {
            let status_name_chunk = '';
            req.on('data', chunk => {
                status_name_chunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let status_name = qs.parse(status_name_chunk);
                    console.log(status_name);
                    await MY_PROFILE_PAGE.editStatus(status_name, id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    }
}

module.exports = new MyProfilePage();
