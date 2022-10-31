const HOME_PAGE = require('./handle/homePage');
const LOGIN_PAGE = require('./handle/loginPage')
const PROFILE_PAGE = require('./handle/profilePage');
const ADMIN_PAGE = require('./handle/adminPage')

const handler = {
    "login": LOGIN_PAGE.login,
    "register": LOGIN_PAGE.register,

    "": HOME_PAGE.indexPage,
    "home": HOME_PAGE.homePage,


    "editProfile": HOME_PAGE.editProfile,


    "profile": PROFILE_PAGE.profilePage,
    "myProfile": PROFILE_PAGE.myProfilePage,
    "product/edit": PROFILE_PAGE.editProduct,
    "product/delete": PROFILE_PAGE.deleteProduct,

    "changePassword": ADMIN_PAGE.changePassword,
    "userChangePassword": ADMIN_PAGE.userChangePassword,
    "manageUserByAdmin": ADMIN_PAGE.adminPage,
    "historyTrade": ADMIN_PAGE.historyTradePage,
    "manageUserPage": ADMIN_PAGE.userPage,
    "manageProviderPage": ADMIN_PAGE.providerPage,

    //pageAdimin
    "admin": HOME_PAGE.adminPage,
    "bill": ADMIN_PAGE.showBill
}

module.exports = handler;