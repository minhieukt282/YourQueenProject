const CONNECTION = require('../model/connection')

CONNECTION.connecting()

class PersonalService {
    findByIdUser(id) {
        let connection = CONNECTION.getConnection()
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
        let connection = CONNECTION.getConnection()
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
        let connection = CONNECTION.getConnection()
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
}

// function editProfile(userEdit,id) {
//     let connection = CONNECTION.getConnection()
//     return new Promise((resolve, reject) => {
//         let sql = `update userdetails
//                    set name     = '${userEdit.name}',
//                        sex_id   = '${+userEdit.sex_id}',
//                        birthday = '${userEdit.birthday}  00:00:00',
//                        height   = '${+userEdit.height}',
//                        weight   = '${+userEdit.weight}'
//                    where user_id = '${+id}'`
//         connection.query(sql, (err, updateProfile) => {
//             if (err) reject(err)
//             else {
//                 console.log('update done')
//                 resolve(updateProfile)
//             }
//         })
//     })
// }
//
// let userDetail = {
//     name: 'Asd',
//     sex_id: 2,
//     birthday: '2017-03-6',
//     height: 140,
//     weight: 44
// }
//
// editProfile(userDetail, 2)
module.exports = new PersonalService()
