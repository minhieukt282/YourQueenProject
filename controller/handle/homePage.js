const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const qs = require('qs')

class HomePage {

   static getHTMLHomePage(userDetails, carouselImage, infoHTML) {
        let userHTML = ''
        let carouselHTML = ''
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
        carouselImage.forEach((item) => {
            carouselHTML += `<div class="carousel-item active" data-bs-interval="2000" style="border-radius: 10px" ">
                                    <img style="border-radius: 15px"  src="${item.url}"  class="d-block w-100" alt="${item.id} ">
                                </div>`
        })
        infoHTML = infoHTML.replace('{userDetail}', userHTML);
        infoHTML = infoHTML.replace('{carousel}', carouselHTML);
        return infoHTML;
    }

    homePage(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, dataHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await HOME_SERVICE.getUserDetails();
                let carousel = await HOME_SERVICE.getCarouselImage();
                dataHtml = HomePage.getHTMLHomePage(products, carousel, dataHtml);
                res.writeHead(200, 'text/html');
                res.write(dataHtml);
                res.end();
            }
        });
    }

    showProfileProvider(req, res, userName) {
        fs.readFile('./views/profile.html', 'utf-8', async (err, profileHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await HOME_SERVICE.getUserDetails();
                let carousel = await HOME_SERVICE.getCarouselImage();
                products = this.getHTMLHomePage(products, carousel, dataHtml);
                res.writeHead(200, 'text/html');
                res.write(dataHtml);
                res.end();
            }
        });
    }

    login(req, res) {
        console.log("login")
    }

    register(req, res) {
        console.log("register")
    }
}

module.exports = new HomePage