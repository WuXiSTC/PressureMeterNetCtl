var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/new', function (req, res, next) {
    res.send("welcome")
});
router.get('/delete', function (req, res, next) {
    res.send("welcome")
});
router.get('/start', function (req, res, next) {
    res.send("welcome")
});
router.get('/stop', function (req, res, next) {
    res.send("welcome")
});
router.get('/getConfig', function (req, res, next) {
    res.send("welcome")
});
router.get('/getResult', function (req, res, next) {
    res.send("welcome")
});
router.get('/getLog', function (req, res, next) {
    res.send("welcome")
});
router.get('/getState', function (req, res, next) {
    res.send("welcome")
});

module.exports = router;
