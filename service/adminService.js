const CONNECTION = require('../model/connection')
// const LOGIN_SERVICE = require("../../service/loginService");
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class AdminService {
    showAll() {
        return new Promise((resolve, reject) => {
            let sql = `select account.username,
                              role.role_name,
                              status.status_name,
                              sex.name, date (userdetails.birthday) as birthday
                       from account
                           join role
                       on account.role_id = role.role_id
                           join status on status.status_id = account.status_id
                           join userdetails on account.id = userdetails.user_id
                           join sex on sex.id = userdetails.sex_id`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    }

    showHistoryTrade() {
        return new Promise((resolve, reject) => {
            let sql = `select u.name as user,
       u.user_id    as userId,
       a.username   as provider,
       a.id         as providerId,
       i.date       as timeTrade,
       sum(p.price) as totalPrice
                       from account a
                           join invoice i
                       on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
                           join userdetails u on a.id = u.user_id
                       group by timeTrade;`
            connection.query(sql, (err, account) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(account)
                }
            })
        })
    }

    showProvider() {
        return new Promise((resolve, reject) => {
            let sql = `select a.username as providerName,
                              a.id       as providerId, date (i.date) as time, sum (p.price) as totalPrice
                       from account a
                           join invoice i
                       on a.id = i.provider_id
                           join product p on i.provider_id = p.provider_id
                       where a.role_id = 2
                       group by time;
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

    showUser() {
        return new Promise((resolve, reject) => {
            let sql = `select u.name       as userName,
                              i.invoice_id as invoiceId,
                              u.user_id    as userId,
                              p.name       as service,
                              a.username   as provider,
                              i.date       as timeTrade
                       from userdetails u
                                join invoice i on u.user_id = i.user_id
                                join invoicedetails i2 on i.invoice_id = i2.invoice_id
                                join product p on i2.product_id = p.product_id
                                join account a on i.provider_id = a.id
                       where a.role_id = 3
                       group by timeTrade
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

    turnoverDay() {
        return new Promise((resolve, reject) => {
            let sql = `select i.date as day,
       sum(p.price) as totalPrice,
       count(i.invoice_id) as totalInvoice
                       from account a
                           join invoice i
                       on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
                           join userdetails u on a.id = u.user_id
                       group by day
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

    turnoverMonth() {
        return new Promise((resolve, reject) => {
            let sql = `select
                           month (i.date) as month,
                           year (i.date) as year,
                           sum (p.price) as totalPrice,
                           count (i.invoice_id) as totalInvoice
                       from account a
                           join invoice i
                       on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
                           join userdetails u on a.id = u.user_id
                       group by month;
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

    turnoverYear() {
        return new Promise((resolve, reject) => {
            let sql = `select
                           year (i.date) as year,
                           sum (p.price) as totalPrice,
                           count (i.invoice_id) as totalInvoice
                       from account a
                           join invoice i
                       on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
                           join userdetails u on a.id = u.user_id
                       group by year (i.date);
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

    changePassword(newPassword, id) {
        return new Promise((resolve, reject) => {
            let sql = `update account
                       set password = '${newPassword}'
                       where id = ${id}`
            connection.query(sql, (err, updatePassword) => {
                if (err) reject(err)
                else {
                    console.log('update done')
                    resolve(updatePassword)
                }
            })
        })
    }


}

module.exports = new AdminService();