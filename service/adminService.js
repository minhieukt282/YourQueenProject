const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class AdminService {
    showAll() {
        return new Promise((resolve, reject) => {
            let sql = `select account.username, role.role_name, status.status_name, sex.name, userdetails.birthday from account
                                join role on account.role_id = role.role_id
                                join status on status.status_id = account.status_id
                                join userdetails on account.id = userdetails.user_id
                                join sex on sex.id = userdetails.sex_id;`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    };

    showUser(account) {
        return new Promise((resolve, reject) => {
            let sql = ``
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    };

    showProvider(account) {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from account
                       where ${account.role_id = 2}`
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

module.exports = new AdminService();