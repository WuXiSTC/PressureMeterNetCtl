let Graph = require("./Graph");
let tasks = {TaskStates: {}, Locations: {}};
let LastUpdate = new Date();
let Inited = false;

async function Get() {
    if ((!Inited) || LastUpdate.getTime() !== Graph.LastUpdate.getTime()) { //未初始化或时间不符时需要更新
        let graph = await Graph.Get();
        LastUpdate = Graph.LastUpdate;
        tasks = get(graph)
    }
    return tasks
}

function Find(id) {
    return Get().Locations[id]
}

function get(graph) {
    let tasks = {TaskStates: {}, Locations: {}};
    let vertexes = graph.Vertexes;
    for (let ID in vertexes) {//遍历测试主机信息
        let TaskList = vertexes[ID].S2SInfo.ServerInfo.AdditionalInfo["TaskList"];//任务列表
        let AccessAddress = vertexes[ID].S2SInfo.ServerInfo.AdditionalInfo["AccessAddress"];//访问地址
        if (TaskList !== undefined) {//如果有任务
            TaskList = JSON.parse(TaskList);
            tasks.TaskStates = Object.assign(tasks.TaskStates, TaskList.TaskStates);//集中任务状态表
            for (let name in TaskList.AllTasks) tasks.Locations[TaskList.AllTasks[name]] = {ID, AccessAddress};//记录任务位置
        }
    }
    return tasks
}

module.exports = {Get, Find};