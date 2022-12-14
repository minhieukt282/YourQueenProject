const CONNECTION = require('../model/connection')
const cookie = require("cookie");

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

    getRole(id) {
        return new Promise((resolve, reject) => {
            let sql = `select a.username, r.role_id, role_name
                       from account as a
                                join role r on a.role_id = r.role_id
                       where a.id = ${id}`
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

    updateUserDetails(user_id) {
        return new Promise((resolve, reject) => {
            let sql = `insert into userdetails (user_id, name, birthday)
                           value ('${user_id}', 'undefined','2006-01-01')`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    }

    updatePicture(user_id) {
        return new Promise((resolve, reject) => {
            let sql = `insert into picture(user_id, link_avt) value ('${user_id}',
                                              'https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-6/278648656_706669643800253_354255430990783689_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=Do6gGBQySCkAX9afWjV&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT9wmBMZFmSJR1zLiV5AuVzUvPMrJYpUYY80zimLBmjRdw&oe=635D1EC3');
            `
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    }

    findByUsername(username) {
        return new Promise((resolve, reject) => {
            let sql = `select account.id, account.role_id, account.status_id
                       from account
                       where username = '${username}'`
            connection.query(sql, (err, dataUser) => {
                if (err) reject(err)
                else resolve(dataUser)
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from account
                                join userdetails u on account.id = u.user_id
                                join picture p on account.id = p.user_id
                                join status s on account.status_id = s.status_id
                       where id = ${id}`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    }

    async getCookie(req) {
        let isStatus = false
        let cookies = cookie.parse(req.headers.cookie || '');
        console.log("da lay cookie", cookies)
        let listAccount = await this.getAccount()
        for (let i = 0; i < listAccount.length; i++) {
            if (listAccount[i].id === +cookies.id) {
                isStatus = true
                return isStatus
            }
        }
        return isStatus
    }

    async checkAdmin(req) {
        let isAdmin = false
        let cookies = cookie.parse(req.headers.cookie || '');
        let statusAccount = await this.getRole(+cookies.id)
        if (statusAccount[0].role_name === "admin")
            isAdmin = true
        return isAdmin
    }

}


module.exports = new LoginService()
