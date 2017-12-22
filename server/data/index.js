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
if(config.env.current==='dev')
    sequelize.sync({force:true}).then(()=> {
        Promise.all([db.user.create({username: 'admin',password:'admin',name:'admin',avatar: './static/image/avatar.jpg',email:'example@example.com'}),
                    db.category.create({name: 'testCategory'}),
                    db.tag.create({name: 'testTag'}),
                    db.tag.create({name:'testTag2'})]).
        then((data)=>{
            db.article.create({
                title:'simple article',summary:'This is a simple test article.',content:'This is a simple test article.'
            }).then((article)=>{
                data[0].addArticle(article);
                data[1].addArticle(article);
                data[2].addArticle(article);
            })
        })
        db.config.create({
            icon: './static/image/icon.png',
            github: 'https://github.com/reditaru'
        })

    })
export default db;