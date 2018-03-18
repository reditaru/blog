/**
 * Created by Administrator on 2017/12/21.
 */
import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import config from '../config'
const dataConfig = config.database
const sequelize = new Sequelize(dataConfig.name,dataConfig.username,dataConfig.password,{
    dialect:dataConfig.dialect,
    storage:dataConfig.storage
})

let db = {}
fs
    .readdirSync(path.join(__dirname,'models'))
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, 'models',file));
        db[model.name] = model;
    });
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;