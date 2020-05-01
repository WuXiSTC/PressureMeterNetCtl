const ParseSource = require("./ParseSource");

//构造一个数据源列表
function Sources() {
    let sources = {};

    /**
     * 从连接图中解析出数据源列表
     * @param graph 连接图
     * @param default_proto 默认协议
     * @returns {{}} 数据源列表，[服务器名称]:[请求地址]
     */
    function Parse(graph, default_proto = "http") {
        sources = {};
        let vertexes = graph.Vertexes;
        for (let id in vertexes) {
            let source = vertexes[id].S2SInfo.ServerInfo.AdditionalInfo.AccessAddress;
            sources[id] = ParseSource(source)
        }
    }

    function Add(id, source) {
        sources[id] = ParseSource(source)
    }

    function Del(id) {
        delete sources[id]
    }

    function Get() {
        let ids = [];
        for (let id in sources) {
            ids.push(id)
        }
        if (ids.length <= 0) throw "没有更多的数据源了！";
        let id = ids[Math.floor(Math.random() * ids.length)];
        return {id: id, source: sources[id]}
    }

    return {Parse, Add, Del, Get}
}

module.exports = Sources;