const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class AdminService {
    showAll() {
        return new Promise((resolve, reject) => {
            let sql = `select account.username, account.id, role.role_name, status.status_name
                       from account
                                join role on account.role_id = role.role_id
                                join status on account.status_id = status.status_id
            ;`
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
            let sql = `select i.invoice_id as invoiceId,
                              i.date       as timeTrade,
                              a.username   as userName,
                              i.user_id as userId,
                              u.name       as provider,
                              i.provider_id as providerId,
                              sum(p.price) as totalPrice

                       from invoice i
                                join product p on i.provider_id = p.provider_id
                                join account a on a.id = i.user_id
                                join userdetails u on i.provider_id = u.user_id
                       group by invoiceId;

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

    showProvider() {
        return new Promise((resolve, reject) => {
            let sql = `select a.username as providerName, a.id as providerId, sum(p.price) as totalPrice
                       from account a
                                join invoice i on a.id = i.provider_id
                                join invoicedetails i2 on i.invoice_id = i2.invoice_id
                                join product p on i.provider_id = p.provider_id
                       group by providerName
            ;

            ;
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

    showUser(){
        return new Promise((resolve, reject) => {
            let sql = `select
                           i.date       as timeTrade,
                           a.username   as userName,
                           i.user_id as userId,
                           u.name       as provider,
                           i.provider_id as providerId,
                           p.name as service,
                           sum(p.price) as totalPrice

                       from invoice i
                                join product p on i.provider_id = p.provider_id
                                join account a on a.id = i.user_id
                                join userdetails u on i.provider_id = u.user_id group by userId
            
            
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

    turnoverDay(){
        return new Promise((resolve, reject) => {
            let sql = `select i.date              as day,
       sum(p.price)        as totalPrice,
       count(i.invoice_id) as totalInvoice
                       from account a
                           join invoice i
                       on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
                       group by day;

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

    turnoverMonth(){
        return new Promise((resolve, reject) => {
            let sql = `select year(i.date)        as year,
                           month(i.date)       as month,
                           sum(p.price)        as totalPrice,
                           count(i.invoice_id) as totalInvoice
                       from account a
                           join invoice i on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
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

    turnoverYear(){
        return new Promise((resolve, reject) => {
            let sql = `select year(i.date)        as year,
                           sum(p.price)        as totalPrice,
                           count(i.invoice_id) as totalInvoice
                       from account a
                           join invoice i on a.id = i.provider_id
                           join invoicedetails i2 on i.invoice_id = i2.invoice_id
                           join product p on i2.product_id = p.product_id
                       group by year;
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

}

module.exports = new AdminService();