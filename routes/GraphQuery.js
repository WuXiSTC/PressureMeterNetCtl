var express = require('express');
var router = express.Router();
const Graph = require("../Dao/Graph");
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.send(JSON.stringify(await Graph.Get()));
});

module.exports = router;
