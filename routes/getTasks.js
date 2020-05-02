require("./DaoConfig")();
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res, next) {
    const Tasks = global.Config.Dao.Tasks;
    res.send(JSON.stringify(await Tasks.Get()));
});

module.exports = router;
