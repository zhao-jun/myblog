var express = require('express');
var router = express.Router();


// GET /getUserInfo 登录信息
router.get('/', function(req, res, next) {
    if (req.session.user) {
        var name = req.session.user.name;
        return res.json({ code: 1000, message: "已登录", name: name })
    } else {
        return res.json({ code: 1001, message: "未登录" })
    }
});

module.exports = router;
