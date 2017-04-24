module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.json({ code: 1009, message: "您还未登录,请先登录" })
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.json({ code: 1000, messgage: "您已登录,不需重新登录" })
        }
        next();
    }
};