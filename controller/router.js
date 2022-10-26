const HOME_PAGE = require('./handle/homePage');
const handler = {
    "home": HOME_PAGE.homePage,
    "login": HOME_PAGE.login,
    "register": HOME_PAGE.register
}

module.exports = handler;