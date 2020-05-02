require("./DaoConfig")();
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res, next) {
    const Graph = global.Config.Dao.Graph;
    res.send(JSON.stringify(await Graph.Get()));
});

module.exports = router;
