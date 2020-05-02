const request = require('request');

/**
 * 请求连接图数据
 * @param URL 请求链接
 * @returns {Promise<graph>}
 */
function requestGraphJSON(URL) {
    return new Promise((resolve, reject) => {
        request(URL, {json: true}, (err, res, body) => {
            if (err) return reject(err);
            resolve(body)
        });
    });
}

/**
 * 对每一个source请求连接图，如果成功即退出，失败即删除数据源
 * @returns {Promise<graph>}
 */

async function requestGraph(sources, GraphQueryURL) {
    for (; ;) {
        let {id, source} = sources.Get();
        try {
            let graph = await requestGraphJSON(source + GraphQueryURL);//获取图
            sources.Parse(graph);//更新数据源
            return graph;//成功即退出
        } catch (e) {//出错
            console.log("Error when getting graph: ", e);
            sources.Del(id);//删除数据源后继续
        }
    }
}

function Graph(sources, GraphQueryURL) {
    let graph = {};//暂存的图
    let GraphDuration = 1e3;
    let LastUpdate = new Date();
    let inited = false;

    /**
     * 获取连接图。有暂存和数据过期则重新获取功能
     * @returns {Promise<Graph>} 返回连接图
     */
    async function Get() {
        if ((!inited) || (new Date().getTime() - LastUpdate.getTime() >= GraphDuration)) {//如果未初始化或数据过期
            graph = await requestGraph(sources, GraphQueryURL);//则重新获取
            LastUpdate = new Date();//更新获取时间
            inited = true
        }
        return graph//返回图
    }

    function GetLastUpdate() {
        return LastUpdate;
    }

    return {Get, GetLastUpdate}
}

module.exports = Graph;