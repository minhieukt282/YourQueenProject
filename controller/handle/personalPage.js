const fs = require('fs');
const PERSONAL_SERVICE = require('../../service/personalService');
const qs = require('qs')

class PersonalPage {
     getHtmlProducts(dataUser, indexHtml) {
        let tbody = '';
        dataUser.map((product, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><a href="/product/edit/${product.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="/product/delete/${product.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

     showPage(req, res) {
        fs.readFile('./views/personalPage.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let dataUser = await PERSONAL_SERVICE.getDataUser();
                indexHtml = this.getHtmlProducts(dataUser, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        })
    }
        showEditProfile(req, res, id)
        {
            if (req.method === 'GET') {
                fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // duong dan dang sai
                        let product = await PERSONAL_SERVICE.findByIdUser(id);
                        console.log(product)
                        // editHtml = editHtml.replace('{name}', product[0].name);
                        // editHtml = editHtml.replace('{price}', product[0].price);
                        // editHtml = editHtml.replace('{quantity}', product[0].quantity);
                        res.writeHead(200, 'text/html');
                        res.write(editHtml);
                        res.end();
                    }
                })
            } else {
                let userEditChunk = '';
                req.on('data', chunk => {
                    userEditChunk += chunk
                });
                req.on('end', async (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let userEdit = qs.parse(userEditChunk);
                        await PERSONAL_SERVICE.editProfile(userEdit, id);
                        res.writeHead(301, {'location': '/home'});
                        res.end();
                    }
                });
            }
        }

        showEditProduct()
        {

        }


    }

    module
.
    exports = PersonalPage
