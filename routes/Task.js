require("./DaoConfig")();
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

async function transmit(req, res, notfound) {
    const Tasks = global.Config.Dao.Tasks;
    let ID = req.params[0];
    let source = await Tasks.Find(ID);
    if (source === undefined || source["AccessAddress"] === undefined) {
        return notfound(req, res);
    }

    source = ParseSource(source.AccessAddress) + global.Config.URL.Task;
    proxy.web(req, res, {target: source});
    await Tasks.Refresh();
}

/* GET home page. */
router.post('/new/*', async function (req, res, next) {
    await transmit(req, res, () => {//先用转发进行处理
        //任务不存在才进行进一步操作
        let source = global.Config.Dao.Soueces.Get().source;
        source = ParseSource(source) + global.Config.URL.Task;
        proxy.web(req, res, {target: source});
    });
});

async function Transmit(req, res) {
    await transmit(req, res, (req, res) => {
        return res.status(404).send("<h1>404 Not Found</h1>");
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
