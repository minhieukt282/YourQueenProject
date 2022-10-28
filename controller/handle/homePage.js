const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const LOGIN_SERVICE = require('../../service/loginService');
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
        carouselImage.forEach((item, i) => {
            if (i === 0) {
                carouselHTML += `<div class="carousel-item active" data-bs-interval="2000">
                                    <img src="${item.url}" class="d-block w-100" alt="${item.id}">
                                </div>`
            } else {
                carouselHTML += `<div class="carousel-item" data-bs-interval="2000">
                                    <img src="${item.url}" class="d-block w-100" alt="${item.id}">
                                </div>`
            }
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

    async userPage(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        console.log("isStatus", isStatus)
        if (isStatus) {
            fs.readFile('./views/user.html', 'utf-8', async (error, dataHtml) => {
                if (error) {
                    console.log(error);
                } else {
                    let products = await HOME_SERVICE.getUserDetails();
                    let carousel = await HOME_SERVICE.getCarouselImage();
                    dataHtml = HomePage.getHTMLHomePage(products, carousel, dataHtml);
                    res.writeHead(200, 'text/html');
                    res.write(dataHtml);
                    res.end();
                }
            });
        } else {
            res.writeHead(301, {'location': 'login'});
            res.end();
        }
    }
}

module.exports = new HomePage