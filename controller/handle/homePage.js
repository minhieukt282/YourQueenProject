const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const qs = require('qs')

class HomePage {
    static getHTMLHomePage(userDetails, infoHTML) {
        let userHTML = ''
        userDetails.forEach((element) => {
            userHTML += `<div class="col-3">
                            <a href="/profile/${element.username}">
                                <div class="card" style="width: 100%; margin-top: 1rem">
                                    <img src='${element.link}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
                                    <div class="card-body">
                                        <h5>${element.username}</h5>
                                    </div>
                                </div>
                            </a>
                         </div>`
        })
        infoHTML = infoHTML.replace('{userDetail}', userHTML);
        return infoHTML;
    }

    static homePage(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, dataHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await HOME_SERVICE.getUserDetails();
                dataHtml = HomePage.getHTMLHomePage(products, dataHtml);
                res.writeHead(200, 'text/html');
                res.write(dataHtml);
                res.end();
            }
        });
    }

    static login(req, res) {
        console.log("login")
    }

    static register(req, res) {
        console.log("register")
    }
}

module.exports = HomePage