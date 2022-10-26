const HOME_PAGE = require('./handle/homePage');
const PERSONAL_PAGE = require('./handle/personalPage');

const handler = {
    "home": HOME_PAGE.homePage,
    "login": HOME_PAGE.login,
    "register": HOME_PAGE.register,
    "personalPage": PERSONAL_PAGE.showPage,
    "userEditProfile": PERSONAL_PAGE.showEditProfile,
    "userEditProduct": PERSONAL_PAGE.showEditProduct
}

module.exports = handler;