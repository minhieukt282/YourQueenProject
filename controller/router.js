const HOME_PAGE = require('./handle/homePage');
const LOGIN_PAGE = require('./handle/loginPage')
const PROFILE_PAGE = require('./handle/profilePage');

const handler = {
    "login": LOGIN_PAGE.login,
    "register": LOGIN_PAGE.register,
    "logout": LOGIN_PAGE.logout,

    "admin":HOME_PAGE.adminPage,
    "":HOME_PAGE.indexPage,
    "home": HOME_PAGE.homePage,


    "editProfile":HOME_PAGE.editProfile,




    "profilePage":PROFILE_PAGE.profile,
    "profile": PROFILE_PAGE.profilePage
}

module.exports = handler;