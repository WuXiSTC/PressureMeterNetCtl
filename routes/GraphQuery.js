var express = require('express');
var router = express.Router();
const Graph = require("../Dao/Graph");
let inited = false;
/* GET home page. */
router.get('/', async function (req, res, next) {
    if (!inited) await Graph.Init("192.168.56.102:80");
    res.send(JSON.stringify(await Graph.Get()));
    res.end()
});

module.exports = router;
