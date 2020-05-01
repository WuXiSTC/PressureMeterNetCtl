var express = require('express');
var router = express.Router();
const Tasks = require("../Dao/Tasks");
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.send(JSON.stringify(await Tasks.Get()));
});

module.exports = router;
