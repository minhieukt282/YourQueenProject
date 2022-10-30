const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class ProfileService {
    static getHome() {
        return new Promise((resolve, reject) => {
            let sql = 'select * from picture'
            connection.query(sql, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    findByUserName(useName) {
        let sql = `select *
                   from account
                            join userdetails u on account.id = u.user_id
                            join picture p on account.id = p.user_id
                            join product p2 on account.id = p2.provider_id
                   where username = '${useName}'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, profile) => {
                if (err) reject(err)
                else {
                    // console.log('Find id done')
                    resolve(profile)
                }
            })
        })
    }
    findById(id) {
        let sql = `select *
                   from account
                            join userdetails u on account.id = u.user_id
                            join picture p on account.id = p.user_id
                            join product p2 on account.id = p2.provider_id
                   where id = '${id}'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, profile) => {
                if (err) reject(err)
                else {
                    // console.log('Find id done')
                    resolve(profile)
                }
            })
        })
    }

}

module.exports = new ProfileService;
