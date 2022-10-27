const fs = require('fs');
const Profile_Page = require('../../service/profileService');
const qs = require('qs')

class ProfilePage {
    // static getHtmlGirl(picture, indexHtml) {
    //     let tbody = '';
    //     picture.map((picture, index) => {
    //         tbody += ` <tr>
    //     <th scope="row">${index+1}</th>
    //     <td>${picture.name}</td>
    //    <img src='${picture.link}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
    //
    //
    // </tr>`
    //     });
    //     indexHtml = indexHtml.replace('{picture}', tbody);
    //     return indexHtml;
    // }

    static profile(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/profile.html', "utf-8", async (err, profileHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200,{
                        'Content-type': 'text/html'
                    });
                    res.write(profileHtml);
                    res.end()
                }
            })

            // static login(req, res) {
            //     console.log("login")
            // }
            //
            // static register(req, res) {
            //     console.log("register")
            // }
        }
    }
}

module.exports = ProfilePage;
