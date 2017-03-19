var express = require('express');
var router = express.Router();


// GET /signOut 登出
router.get('/', function(req, res, next) {
    // 清空 session 中用户信息
    req.session.user = null;
    return res.json({ code: 1000, messgage: "退出成功" });
});

module.exports = router;