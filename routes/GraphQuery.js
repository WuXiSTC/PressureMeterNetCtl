require("./DaoConfig")();
const Graph = global.Config.Dao.Graph;
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.send(JSON.stringify(await Graph.Get()));
});

module.exports = router;
