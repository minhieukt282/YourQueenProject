const CONNECTION = require('../model/connection')
let connection = CONNECTION.getConnection()
CONNECTION.connecting()

class PersonalService {
    getDataUser() {
        let sql = `select name, sex_id, birthday, height, weight, role_id, status_id
                   from user`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, userId) => {
                if (err) reject(err)
                else {
                    console.log('get data done')
                    resolve(userId)
                }
            })
        })
    }

    findByIdUser(id) {
        let sql = `select *
                   from user
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, userId) => {
                if (err) reject(err)
                else {
                    console.log('Find id done')
                    resolve(userId)
                }
            })
        })
    }

    

    editProfile(userEdit, id) {
        return new Promise((resolve, reject) => {
            let sql = `update userdetails
                       set name     = '${userEdit.name}',
                           sex_id   = '${+userEdit.sex_id}',
                           birthday = '${userEdit.birthday}  00:00:00',
                           height   = '${+userEdit.height}',
                           weight   = '${+userEdit.weight}'
                       where user_id = '${+id}'`
            connection.query(sql, (err, updateProfile) => {
                if (err) reject(err)
                else {
                    console.log('update done')
                    resolve(updateProfile)
                }
            })
        })
    }

    editProduct(product, id) {
        return new Promise((resolve, reject) => {
            let sql = `update userdetails
                       set name     = '${product.name}',
                           sex_id   = '${+product.sex_id}',
                           birthday = '${product.birthday}  00:00:00',
                           height   = '${+product.height}',
                           weight   = '${+product.weight}'
                       where user_id = '${+id}'`
            connection.query(sql, (err, updateProfile) => {
                if (err) reject(err)
                else {
                    console.log('update done')
                    resolve(updateProfile)
                }
            })
        })
    }

    findByName(searchName) {
        let sql = `select name, sex_id, birthday, height, weight, role_id, status_id
                   from user
                   where name = '%${searchName}%'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, userId) => {
                if (err) reject(err)
                else {
                    console.log('Find by name done')
                    resolve(userId)
                }
            })
        })
    }
}

module.exports = new PersonalService()
