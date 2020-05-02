function Dao(source, GraphQueryURL) {
    let dao = {};
    dao.Soueces = require("./Sources")();
    dao.Soueces.Add("", source);
    dao.Graph = require("./Graph")(dao.Soueces, GraphQueryURL);
    dao.Tasks = require("./Tasks")(dao.Graph);
    return dao
}

module.exports = Dao;