function parseTasks(graph) {
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

function Tasks(Graph) {
    let tasks = {TaskStates: {}, Locations: {}};
    let LastUpdate = new Date();
    let inited = false;

    async function Get() {
        if ((!inited) || (LastUpdate.getTime() !== Graph.GetLastUpdate().getTime())) { //未初始化时间不符时需要更新
            let graph = await Graph.Get();
            LastUpdate = Graph.GetLastUpdate();
            tasks = parseTasks(graph);
            inited = true
        }
        return tasks
    }

    async function Find(id) {
        return (await Get()).Locations[id]
    }

    return {Get, Find}
}

module.exports = Tasks;