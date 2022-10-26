const CONNECTION = require('../model/connection')
const Connection = require("../../../caseMD3/YourQueenProject/model/connection");

CONNECTION.connecting()

class HomeService {
    createAccount(account) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            let sql = `insert into account(username, password, role_id, status_id)
                       values ('${account.username}', '${account.password}', ${account.role_id = 3},
                                ${account.status_id = 2})`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })

        })
    };

}

module.exports = new HomeService()
