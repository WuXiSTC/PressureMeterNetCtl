module.exports = () => {
    let source = process.env.npm_config_source;
    if (source === undefined) {
        console.log("使用方法: npm start --source=[某个测试主机的AccessAddress]");
        source = "192.168.56.102:80";
        console.log("--source 未指定，默认为" + source)
    }
    let Dao = require("../Dao/index")(source, "/GraphQuery");
    global.Config = {Dao, URL: {Task: "/Task"}}
};