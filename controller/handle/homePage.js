const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const qs = require('qs')

class HomePage {
    static getHtmlGirl(picture, indexHtml) {
        let tbody = '';
        picture.map((picture, index) => {
            tbody += ` <tr>
        <th scope="row">${index+1}</th>
        <td>${picture.name}</td>
       <img src='${picture.link}' class="card-img-top" alt="..." style="width: 226px; height: 226px; object-fit: contain; margin: auto">
       
       
    </tr>`
        });
        indexHtml = indexHtml.replace('{picture}', tbody);
        return indexHtml;
    }

    static homePage(req, res) {
        console.log("home page")
        fs.readFile('./views/index.html', "utf-8", async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let picture = await HOME_SERVICE.getHome();
                indexHtml = HomePage.getHtmlGirl(picture, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    // static login(req, res) {
    //     console.log("login")
    // }
    //
    // static register(req, res) {
    //     console.log("register")
    // }
}

module.exports = HomePage
