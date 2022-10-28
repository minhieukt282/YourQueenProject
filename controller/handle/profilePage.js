const fs = require('fs');
const PROFILE_PAGE = require('../../service/profileService');
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

    static getDataProfile(infoProfile, infoHTML) {
        let infoIMG =''
        infoHTML = infoHTML.replace('{useName}', infoProfile[0].username);
        infoHTML = infoHTML.replace('{urlAvt}', infoProfile[0].link);
        infoHTML = infoHTML.replace('{name}', infoProfile[0].name);
        infoProfile.forEach((item) => {
            console.log(item.link)
            infoIMG += `<img src="${item.link}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
        })
        infoHTML = infoHTML.replace('{img}', infoIMG);
        return infoHTML;
    }

    profilePage(req, res, useName) {
        fs.readFile('./views/profile.html', "utf-8", async (err, profileHtml) => {
            if (err) {
                console.log(err)
            } else {
                let infoProfile = await PROFILE_PAGE.findByUserName(useName);
                console.log("bàng may va", infoProfile)
                profileHtml = ProfilePage.getDataProfile(infoProfile, profileHtml);
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(profileHtml);
                res.end()
            }
        })
    }
}

module.exports = new ProfilePage;
