require("./DaoConfig")();
const Tasks = global.Config.Dao.Tasks;
var express = require('express');
var router = express.Router();
const proxy = require('http-proxy').createProxyServer();
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(err.toString());
});

let ParseSource = require("../Dao/ParseSource");

async function transmit(req, res, next) {
    let ID = req.params[0];
    let source = await Tasks.Find(ID);
    if (source === undefined || source["AccessAddress"] === undefined) {
        return res.status(404).send("<h1>404 Not Found</h1>");
    }

    source = ParseSource(source.AccessAddress) + global.Config.URL.Task;
    proxy.web(req, res, {target: source});
    next()
}

/* GET home page. */
router.post('/new/*', async function (req, res, next) {
    let ok = false;
    await transmit(req, res, () => {//先用转发进行处理
        ok = true//ok = true表明任务已存在
    });
    if (ok) return;//如果任务已存在就直接退出
    //任务不存在才进行进一步操作
    let source = ParseSource(source.AccessAddress) + global.Config.URL.Task;
    proxy.web(req, res, {target: source});
});

function Transmit(req, res) {
    transmit(req, res, () => {
    })
}

router.get('/delete/*', Transmit);
router.get('/start/*', Transmit);
router.get('/stop/*', Transmit);
router.get('/getConfig/*', Transmit);
router.get('/getResult/*', Transmit);
router.get('/getLog/*', Transmit);
router.get('/getState/*', Transmit);

module.exports = router;
