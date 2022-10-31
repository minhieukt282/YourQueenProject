const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class MyProfileService {

    editStatus(status_Name, id) {
        let sql = `update status
                   set status_name = '${status_Name}'
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, myProfile) => {
                if (err) reject(err)
                else {
                    // console.log('Find id done')
                    resolve(myProfile)
                }
            })
        })
    }

    showStatus() {
        let sql =`select *
                  from status`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, status) => {
                if (err) reject(err)
                else {
                    // console.log('Find id done')
                    console.log(status)
                    resolve(status)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from status
                              where id = ${id} `, (err, status) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(status);
                }
            });
        })
    }


}

module.exports = new MyProfileService();