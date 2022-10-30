const HOME_PAGE = require('./handle/homePage');
const LOGIN_PAGE = require('./handle/loginPage')
const PROFILE_PAGE = require('./handle/profilePage');
const ADMIN_PAGE = require('./handle/adminPage')

const handler = {
    "login": LOGIN_PAGE.login,
    "register": LOGIN_PAGE.register,

    "admin": HOME_PAGE.adminPage,
    "": HOME_PAGE.indexPage,
    "home": HOME_PAGE.homePage,


    "editProfile": HOME_PAGE.editProfile,


    "profile": PROFILE_PAGE.profilePage,
    "myProfile": PROFILE_PAGE.myProfilePage,

    "changePassword": ADMIN_PAGE.changePassword,
    "manageUserByAdmin": ADMIN_PAGE.adminPage,
    "historyTrade": ADMIN_PAGE.historyTradePage,
    "manageUserPage": ADMIN_PAGE.userPage,
    "manageProviderPage": ADMIN_PAGE.providerPage,
    "turnoverDays": ADMIN_PAGE.turnoverDay,
    "turnoverMonth": ADMIN_PAGE.turnoverMonth,
    "turnoverYear": ADMIN_PAGE.turnoverYear

}

module.exports = handler;