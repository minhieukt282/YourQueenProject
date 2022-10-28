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

    getUserDetails() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select p.link, a.username
                              from picture p
                                       join account a on a.id = p.user_id
                              group by a.id`, (err, userDetails) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userDetails);
                }
            });
        })
    }

    getCarouselImage() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select url, id
                              from imgcarousel`, (err, userDetails) => {
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
