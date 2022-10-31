const ADMIN_PAGE=require('./handle/adminPage')
const handler = {
    "manageAllAccount":ADMIN_PAGE.adminPage,
    "historyTrade":ADMIN_PAGE.historyTradePage,
    "manageUserPage":ADMIN_PAGE.userPage,
    "manageProviderPage":ADMIN_PAGE.providerPage,
    "turnoverDays":ADMIN_PAGE.turnoverDay,
    "turnoverMonth":ADMIN_PAGE.turnoverMonth,
    "turnoverYear":ADMIN_PAGE.turnoverYear,



}

module.exports = handler;

//turnover day/month :doanh thu theo ngay/thang
//manage user/provider :hien thi nguoi  dung/nguoi cung cap dich vu