const fs = require('fs')

function createRandomString(strLength) {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        let possibleCharacter = 'abcdefghiklmnopqwerszx1234567890';
        let str = '';
        for (let i = 0; i < strLength; i++) {
            let randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));
            str += randomCharacter;
        }
        return str;
    }
}
const checkout = typeof window !== 'undefined' ? localStorage.getItem('tokenId') : null
function createTokenSession(data) {
    let tokenId = createRandomString(20);
    let pathName = './token/' + tokenId + '.json';
    fs.writeFile(pathName, data, err => {
    });
    localStorage.setItem("tokenID", JSON.stringify(data))
}


let expires = Date.now() + 5*60;
let data = {
    id: 'hie',
    email: 'ad@dad.cc',
    password: '12',
    expires: `${expires}`
}
let tokenSession = "{\"name\":\"" + data.name + "\",\"email\":\"" + data.email + "\",\"password\":\"" + data.password + "\",\"expires\":" + expires + "}";
createTokenSession(tokenSession);


function deleteTokenSession(fileName) {
    let filePath = './token/' + fileName;
    // fs.unlink(fileName, err => {
    //     if (err) throw err;
    //     console.log('File deleted!');
    // });
    fs.unlinkSync(filePath)
}

// readSession()
// function readSession() {
//     //lấy sessionId từ local storage
//     let tokenID = localStorage.getItem()
//     console.log(tokenID)
//     // if (tokenID) {
//     //     let sessionString = "";
//     //     let expires = 0;
//     //     //đọc file sessionId tương ứng phía server
//     //     fs.readFile('./token/' + tokenID, 'utf8', (err, data) => {
//     //         if (err) {
//     //             console.error(err)
//     //             return
//     //         }
//     //         sessionString = String(data);
//     //         // lấy ra thời gian hết hạn của sessionId
//     //         expires = JSON.parse(sessionString).expires;
//     //         // lấy ra thời gian hiện tại
//     //         let now = Date.now();
//     //         if (expires < now) {
//     //             deleteTokenSession(tokenID);
//     //             // router.login(req, res);
//     //         } else {
//     //             let parseUrl = url.parse(req.url, true);
//     //             let path = parseUrl.pathname;
//     //             let trimPath = path.replace(/^\/+|\/+$/g, '');
//     //             //Nếu đường dẫn là /logout thì thực hiện xoá session và chuyển về trang login
//     //             if (trimPath === "logout") {
//     //                 console.log("logout");
//     //                 deleteTokenSession(tokenID);
//     //                 router.login(req, res);
//     //             } else {
//     //                 fs.readFile('./views/dashboard.html', 'utf8', function (err, datahtml) {
//     //                     if (err) {
//     //                         console.log(err);
//     //                     }
//     //                     datahtml = datahtml.replace('{name}', JSON.parse(sessionString).name);
//     //                     datahtml = datahtml.replace('{email}', JSON.parse(sessionString).email);
//     //                     res.writeHead(200, {'Content-Type': 'text/html'});
//     //                     res.write(datahtml);
//     //                     return res.end();
//     //                 });
//     //             }
//     //
//     //         }
//     //     });
//     // } else {
//     //     // chưa đăng nhập
//     //     let parseUrl = url.parse(req.url, true);
//     //     let path = parseUrl.pathname;
//     //     let trimPath = path.replace(/^\/+|\/+$/g, '');
//     //     let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notfound;
//     //     chosenHandler(req, res);
//     // }
// }
