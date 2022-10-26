const fs = require('fs')
const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class TokenService {
    createRandomString(stringLength) {
        stringLength = typeof (stringLength) == 'number' && stringLength > 0 ? stringLength : false;
        if (stringLength) {
            let possibleCharacter = 'abcdefghiklmnopqwerszx1234567890';
            let str = '';
            for (let i = 0; i < stringLength; i++) {
                let randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));
                str += randomCharacter;
            }
            return str;
        }
    }

    createTokenSession(dataToken, tokenId) {
        let pathName = './token/' + tokenId + '.json';
        fs.writeFile(pathName, dataToken, err => {
            if (err) console.log(err)
        });
    }

    insertTokenId(userId, tokenId) {
        let sql = `update account
                   set token_Id = '${tokenId}'
                   where id = '${userId}'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, dataUser) => {
                if (err) reject(err)
                else resolve(dataUser)
            })
        })
    }


}

module.exports = new TokenService()