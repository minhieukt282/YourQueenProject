const HOME_PAGE = require('./handle/homePage');
const LOGIN_PAGE = require('./handle/loginPage')
const ADMIN_PAGE=require('./handle/adminPage')
const handler = {
    "home": HOME_PAGE.homePage,
    "manageUserByAdmin":ADMIN_PAGE.adminPage,
    "historyTrade":ADMIN_PAGE.historyTradePage,
    "manageUserPage":ADMIN_PAGE.userPage,
    "manageProviderPage":ADMIN_PAGE.providerPage,
    "turnoverDays":ADMIN_PAGE.turnoverDay,
    "turnoverMonth":ADMIN_PAGE.turnoverMonth,
    "turnoverYear":ADMIN_PAGE.turnoverYear,
    "login": LOGIN_PAGE.login,
    "register": LOGIN_PAGE.register,


}

module.exports = handler;

//turnover day/month :doanh thu theo ngay/thang
//manage user/provider :hien thi nguoi  dung/nguoi cung cap dich vu