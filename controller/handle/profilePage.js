const fs = require('fs');
const PROFILE_PAGE = require('../../service/profileService');
const qs = require('qs')

class ProfilePage {

    static getDataProfile(infoProfile, infoHTML) {
        let infoIMG =''
        infoHTML = infoHTML.replace('{useName}', infoProfile[0].username);
        infoHTML = infoHTML.replace('{urlAvt}', infoProfile[0].link);
        infoHTML = infoHTML.replaceAll('{name}', infoProfile[0].name);
        infoProfile.forEach((item) => {
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
                profileHtml = ProfilePage.getDataProfile(infoProfile, profileHtml);
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(profileHtml);
                res.end()
            }
        })
    }
}

module.exports = new ProfilePage();
