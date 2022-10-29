const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const LOGIN_SERVICE = require('../../service/loginService')
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
                                    <img style="border-radius: 15px"  src="${item.url}"  class="d-block w-100" alt="${item.id} "></div>`
        })
        infoHTML = infoHTML.replace('{userDetail}', userHTML);
        infoHTML = infoHTML.replace('{carousel}', carouselHTML);
        return infoHTML;
    }

    indexPage(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, dataIndexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await HOME_SERVICE.getUserDetails();
                let carousel = await HOME_SERVICE.getCarouselImage();
                dataIndexHtml = HomePage.getHTMLHomePage(products, carousel, dataIndexHtml);
                res.writeHead(200, 'text/html');
                res.write(dataIndexHtml);
                res.end();
            }
        });
    }

    async homePage(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        console.log("isStatus home", isStatus)
        if (isStatus) {
            fs.readFile('./views/home.html', 'utf-8', async (err, dataHomeHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let products = await HOME_SERVICE.getUserDetails();
                    let carousel = await HOME_SERVICE.getCarouselImage();
                    dataHomeHtml = HomePage.getHTMLHomePage(products, carousel, dataHomeHtml);
                    res.writeHead(200, 'text/html');
                    res.write(dataHomeHtml);
                    res.end();
                }
            });
        } else {
            res.writeHead(301, {'location': 'login'});
            res.end();
        }
    }

    async adminPage(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        if (isStatus === true) {
            let isAmin = await LOGIN_SERVICE.checkAdmin(req)
            if (isAmin === true) {
                fs.readFile('./views/admin/admin.html', 'utf-8', async (err, dataAdminHtml) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let products = await HOME_SERVICE.getUserDetails();
                        let carousel = await HOME_SERVICE.getCarouselImage();
                        dataAdminHtml = HomePage.getHTMLHomePage(products, carousel, dataAdminHtml);
                        res.writeHead(200, 'text/html');
                        res.write(dataAdminHtml);
                        res.end();
                    }
                });
            }
        } else {
            res.writeHead(301, {'location': 'login'});
            res.end();
        }
    }

    async editProfile(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        let isAmin = await LOGIN_SERVICE.checkAdmin(req)
        console.log("isStatus edit", isStatus)
        if (isStatus === true && isAmin === false) {
            fs.readFile('./views/editProfile.html', 'utf-8', async (err, dataHtml) => {
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
        } else {
            res.writeHead(301, {'location': 'login'});
            res.end();
        }

    }
}

module.exports = new HomePage()