const ParseSource = require("./ParseSource");
let sources = require("./Sources")();//图数据源列表
let graph = {};

const SourceURL = "/GraphQuery";

let Graph = {GraphDuration: 1e3};
Graph.LastUpdate = new Date();
/**
 * 使用一个数据源进行初始化
 * @param source (optional)数据源地址
 * @returns {Promise<Graph>} 返回连接图
 */
Graph.Init = async (source) => {
    if (typeof source === "string") {
        sources.Add("", source);
    } else throw "请输入一个IP地址";
    graph = await getGraph();
};
/**
 * 获取连接图。有暂存和数据过期则重新获取功能
 * @returns {Promise<Graph>} 返回连接图
 */
Graph.Get = async () => {
    if (new Date().getTime() - Graph.LastUpdate.getTime() >= Graph.GraphDuration) {//如果数据过期
        graph = await getGraph();//则重新获取
        Graph.LastUpdate = new Date()//更新获取时间
    }
    return graph//返回图
};

/**
 * 对每一个source请求连接图，如果成功即退出，失败即删除数据源
 * @returns {Promise<graph>}
 */

async function getGraph() {
    for (; ;) {
        let {id, source} = sources.Get();
        try {
            let graph = await requestGraphJSON(source);//获取图
            sources.Parse(graph);//更新数据源
            return graph;//成功即退出
        } catch (e) {//出错
            console.log("Error when getting graph: ", e);
            sources.Del(id);//删除数据源后继续
        }
    }
}

const request = require('request');

/**
 * 请求连接图数据
 * @param source 数据源
 * @returns {Promise<graph>}
 */
function requestGraphJSON(source) {
    return new Promise((resolve, reject) => {
        request(source + SourceURL, {json: true}, (err, res, body) => {
            if (err) return reject(err);
            resolve(body)
        });
    });
}

module.exports = Graph;