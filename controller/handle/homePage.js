const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const LOGIN_SERVICE = require('../../service/loginService');
const PROFILE_PAGE = require('../../service/profileService');
const ADMIN_SERVICE = require('../../service/adminService');
const qs = require('qs')
const cookie = require("cookie");

class HomePage {

    static getIndexPage(userDetails, carouselImage, infoHtml) {
        let userHtml = ''
        let carouselHTML = ''
        userDetails.forEach((element) => {
            if (element.text_1 != null) {
                userHtml += `<div class="col-3">
                             <div class="card" style="width: 100%; margin-top: 1rem">
                                <a href="/login">
                                    <img src='${element.link_avt}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
                                    <div class="card-body">
                                        <h5>${element.username}</h5>
                                    </div>
                                </a>
                                <h6>${element.text_1}</h6>
                             </div>
                         </div>`
            } else {
                userHtml += `<div class="col-3">
                             <div class="card" style="width: 100%; margin-top: 1rem">
                                <a href="/login">
                                    <img src='${element.link_avt}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
                                    <div class="card-body">
                                        <h5>${element.username}</h5>
                                    </div>
                                </a>
                                <h6> Kết Bạn Bốn Phương </h6>
                             </div>
                         </div>`
            }

        })
        carouselImage.forEach((item) => {
            carouselHTML += `<div class="carousel-item active" data-bs-interval="2000" style="border-radius: 10px" ">
                                    <img style="border-radius: 15px"  src="${item.url}"  class="d-block w-100" alt="${item.id} "></div>`
        })
        infoHtml = infoHtml.replace('{userDetail}', userHtml);
        infoHtml = infoHtml.replace('{carousel}', carouselHTML);
        return infoHtml;
    }

    indexPage(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, dataIndexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await HOME_SERVICE.getProviderDetails();
                let carousel = await HOME_SERVICE.getCarouselImage();
                dataIndexHtml = HomePage.getIndexPage(products, carousel, dataIndexHtml);
                res.writeHead(200, 'text/html');
                res.write(dataIndexHtml);
                res.end();
            }
        });
    }

    static getHtmlHomePage(userDetails, carouselImage, infoHtml, userInfo) {
        let userHtml = ''
        let carouselHTML = ''
        userDetails.forEach((element) => {
            if (element.text_1 != null) {
                userHtml += `<div class="col-3">
                             <div class="card" style="width: 100%; margin-top: 1rem">
                                <a href="/profile/${element.username}">
                                    <img src='${element.link_avt}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
                                    <div class="card-body">
                                        <h5>${element.username}</h5>
                                    </div>
                                </a>
                                <h6>${element.text_1}</h6>
                             </div>
                         </div>`
            } else {
                userHtml += `<div class="col-3">
                             <div class="card" style="width: 100%; margin-top: 1rem">
                                <a href="/profile/${element.username}">
                                    <img src='${element.link_avt}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
                                    <div class="card-body">
                                        <h5>${element.username}</h5>
                                    </div>
                                </a>
                                <h6> Kết Bạn Bốn Phương </h6>
                             </div>
                         </div>`
            }

        })
        carouselImage.forEach((item) => {
            carouselHTML += `<div class="carousel-item active" data-bs-interval="2000" style="border-radius: 10px" ">
                                    <img style="border-radius: 15px"  src="${item.url}"  class="d-block w-100" alt="${item.id} "></div>`
        })
        infoHtml = infoHtml.replace('{userDetail}', userHtml);
        infoHtml = infoHtml.replace('{carousel}', carouselHTML);
        infoHtml = infoHtml.replace('{name}', userInfo[0].name)
        infoHtml = infoHtml.replace('{imgAvt}', userInfo[0].link_avt)
        return infoHtml;
    }

    async homePage(req, res) {
        let isStatus = await LOGIN_SERVICE.getCookie(req)
        console.log("isStatus home", isStatus)
        if (isStatus) {
            fs.readFile('./views/home.html', 'utf-8', async (err, dataHomeHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let cookies = cookie.parse(req.headers.cookie || '');
                    let userInfo = await PROFILE_PAGE.findById(cookies.id)
                    let products = await HOME_SERVICE.getProviderDetails();
                    let carousel = await HOME_SERVICE.getCarouselImage();
                    dataHomeHtml = HomePage.getHtmlHomePage(products, carousel, dataHomeHtml, userInfo);
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

    static creatTableMember(arrMember, dataHtml) {
        let members = ''
        arrMember.forEach((item, index) => {
            members += `<div class="row">
                            <div class="col-1">${index + 1}</div>
                            <div class="col">${item.name}</div>
                            <div class="col">${item.username}</div>
                            <div class="col-2">${item.status}</div>
                        </div>`
        });
        dataHtml = dataHtml.replace('{members}', members)
        return dataHtml;
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
                        let arrMember = await ADMIN_SERVICE.getListMember();
                      let dataAdHTML = await HomePage.creatTableMember(arrMember, dataAdminHtml);
                        res.writeHead(200, 'text/html');
                        res.write(dataAdHTML);
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
                    let products = await HOME_SERVICE.getProviderDetails();
                    let carousel = await HOME_SERVICE.getCarouselImage();
                    dataHtml = HomePage.getHtmlHomePage(products, carousel, dataHtml);
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