const CONNECTION = require('../model/connection')
const Connection = require("../../../gitTestProject/model/connectDatabase");

CONNECTION.connecting()

class HomeService {
    static createNewAccount(account){
        let connection=Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into account(username,password,role_id,status_id) values ('${account.username}','${account.password}',${account.role_id=3},${account.status_id=2})`,(err,account)=>{
                if (err){
                    reject(err)
                }else {
                    resolve(account)
                }
            })

        })
    }
}

module.exports = new HomeService()
