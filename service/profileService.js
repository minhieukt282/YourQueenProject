const CONNECTION = require('../model/connection')

CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class ProfileService {
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
}

module.exports = ProfileService;
