const HOME_PAGE = require('./handle/homePage');
const LOGIN_PAGE = require('./handle/loginPage')
const PERSONAL_PAGE = require('./handle/personalPage');
const PROFILE_PAGE = require('./handle/profilePage');


const handler = {
    "home": PROFILE_PAGE.profile,
    "": HOME_PAGE.homePage,
    "login": LOGIN_PAGE.login,
    "register": LOGIN_PAGE.register,
    "logout": LOGIN_PAGE.logout,
    "personalPage": PERSONAL_PAGE.showPage,
    "userEditProfile": PERSONAL_PAGE.showEditProfile,
    "userEditProduct": PERSONAL_PAGE.showEditProduct,
    "profile": PROFILE_PAGE.profilePage
}

module.exports = handler;