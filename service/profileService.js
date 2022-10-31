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

    findByUserName(userName) {
        let sql = `select *
                   from account
                            join userdetails u on account.id = u.user_id
                            join picture p on account.id = p.user_id
                            join product p2 on account.id = p2.provider_id
                            join status s on account.status_id = s.status_id
                   where username = '${userName}'`
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
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from account
                                join userdetails u on account.id = u.user_id
                                join picture p on account.id = p.user_id
                                join product p2 on account.id = p2.provider_id
                                join status s on account.status_id = s.status_id
                       where id = '${id}'`
            connection.query(sql, (err, profile) => {
                if (err) reject(err)
                else {
                    // console.log('Find id done')
                    resolve(profile)
                }
            })
        })
    }

    findProductById(id) {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from product
                                join account a on a.id = product.provider_id
                       where product_id = '${id}'`
            connection.query(sql, (err, profile) => {
                if (err) reject(err)
                else {
                    // console.log('Find id done')
                    resolve(profile)
                }
            })
        })
    }

    editProduct(product, product_id) {
        let sql = `update product
                   set product_name = '${product.product_name}',
                       price        = +'${product.price}',
                       description  ='${product.description}'
                   where product_id = '${product_id}'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, profile) => {
                if (err) reject(err)
                else {
                    console.log('edit done')
                    resolve(profile)
                }
            })
        })
    }

    delProduct(product, product_id) {
        let sql = `delete
                   from product
                   where product_id = '${product_id}'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, profile) => {
                if (err) reject(err)
                else {
                    console.log('delete done')
                    resolve(profile)
                }
            })
        })
    }
}

module.exports = new ProfileService;
