const fs = require('fs');
const PROFILE_PAGE = require('../../service/profileService');
const qs = require('qs')

class ProfilePage {

    static getDataProfile(infoProfile, infoHtml) {
        let infoIMG =''
        infoHtml = infoHtml.replace('{useName}', infoProfile[0].username);
        infoHtml = infoHtml.replace('{urlAvt}', infoProfile[0].link);
        infoHtml = infoHtml.replaceAll('{name}', infoProfile[0].name);
        infoProfile.forEach((item) => {
            infoIMG += `<img src="${item.link}"
                                  alt="" style="width: 121px; height:121px; object-fit: contain; justify-content: flex-start; margin: auto">`
        })
        infoHtml = infoHtml.replace('{img}', infoIMG);
        return infoHtml;
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
