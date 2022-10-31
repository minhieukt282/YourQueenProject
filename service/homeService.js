const CONNECTION = require('../model/connection')

CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class HomeService {
    static getHome() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from picture', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    getProviderDetails() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from picture p
                                join account a on a.id = p.user_id
                       where a.role_id = 2
                       group by a.id`
            connection.query(sql, (err, userDetails) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userDetails);
                }
            });
        })
    }

    getCarouselImage() {
        return new Promise((resolve, reject) => {
            let sql = `select url, id
                       from imgcarousel`
            connection.query(sql, (err, userDetails) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userDetails);
                }
            });
        })
    }
}

module.exports = new HomeService();
