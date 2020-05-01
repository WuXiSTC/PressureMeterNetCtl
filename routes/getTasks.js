var express = require('express');
var router = express.Router();
const GetTasks = require("../Dao/GetTasks");
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(JSON.stringify(GetTasks()));
});

module.exports = router;
