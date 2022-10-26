const HOME_PAGE = require('./handle/homePage');
const handler = {
    "home": HOME_PAGE.homePage,
    "login": HOME_PAGE.login,
    "register": HOME_PAGE.register,
    "admin":HOME_PAGE.adminPage,
    "user":HOME_PAGE.userPage
}

module.exports = handler;