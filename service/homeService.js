const CONNECTION = require('../model/connection')
CONNECTION.connecting()
let connection = CONNECTION.getConnection();

class HomeService {

}

module.exports = new HomeService()
