const fs = require('fs');
const HOME_SERVICE = require('../../service/homeService');
const qs = require('qs')

class HomePage {
    homePage(req, res){
        console.log("home page")
    }
    login(req, res){
        console.log("login")
    }
    register(req, res){
        console.log("register")
    }
}

module.exports = HomePage
