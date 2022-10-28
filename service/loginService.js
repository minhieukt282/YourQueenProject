const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class LoginService {
    async checkAccount(account) {
        let listAccount = await this.getAccount();
        for (let i = 0; i < listAccount.length; i++) {
            if (account.username === listAccount[i].username) {
                return true;
            }
        }
        return false
    }

    async isCheckGate(account) {
        let listAccount = await this.getAccount();
        for (let i = 0; i < listAccount.length; i++) {
            if (account.username === listAccount[i].username && account.password === listAccount[i].password) {
                return true;
            }
        }
        return false
    }

    getAccount() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from account`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    }

    createAccount(account) {
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

    findByUsername(username) {
        let sql = `select account.id, account.role_id, account.status_id
                   from account
                   where username = '${username}'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, dataUser) => {
                if (err) reject(err)
                else resolve(dataUser)
            })
        })
    }

}

module.exports = new LoginService()