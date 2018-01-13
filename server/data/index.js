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
//初始测试数据
if(config.env.current==='dev')
    sequelize.sync({force:true}).then(()=> {
        Promise.all([db.user.create({username: 'SteinsKurisu',password:'admin',name:'SteinsKurisu',avatar: '/static/img/avatar.png',email:'example@example.com'}),
                    db.category.create({name: 'testCategory'}),
                    db.tag.create({name: 'testTag'}),
                    db.tag.create({name:'testTag2'}),
            db.user.create({username: 'SteinsKurisu2',password:'admin',name:'SteinsKurisu',avatar: '/static/img/avatar.png',email:'example@example.com'})]).
        then((data)=>{
            db.article.create({
                title:'自己动手写一个神经网络(1)：BP神经网络',
                summary:`很早之前就想写一个神经网络，大概是在EL比赛的时候看到一等奖中评价action的权值是跑出来的时候就想写了。。不过到现在发现那一个式子也不过是一个 multiple regression？再到上小学期的时候，看到一个有趣的二次元图片拉伸的site，效果很给力`,
                content:'This is a simple test article.'
            }).then(async(article)=>{
                data[0].addArticle(article);
                data[1].addArticle(article);
                data[2].addArticle(article);
            })
        })
        db.config.create({
            icon: '/static/img/icon.png',
            avatar:'/static/img/avatar.png',
            github: 'https://github.com/reditaru',
            weibo:'https://weibo.com/reditaru',
            twitter:'https://twitter.com/reditaru1997',
            mail:'reditaru1997@gmail.com,',
            header:'Steins Kurisu',
            subHeader:'BAD STUDENT IN NJU, MAJOR IN SOFTWARE ENGINEER'
        })
    })
export default db;