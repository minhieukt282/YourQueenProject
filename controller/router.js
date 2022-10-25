const PRODUCT_ROUTING = require('./handle/homePage');
const handler = {
    "home": PRODUCT_ROUTING.homePage,
    "login": PRODUCT_ROUTING.login,
    "register": PRODUCT_ROUTING.register
}

module.exports = handler;