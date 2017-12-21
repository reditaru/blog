/**
 * Created by Administrator on 2017/12/21.
 */

export default function(sequelize,DataTypes){
    let Article = sequelize.define('article',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:DataTypes.STRING,
        summary:DataTypes.TEXT,
        content:DataTypes.TEXT,
        readCount:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        commentCount:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        paranoid: true
    })
    Article.associate = function (models) {
        Article.belongsTo(models.category,{as:'category',foreignKey:'categoryId'})
        Article.belongsToMany(models.tag,{as:'tags',through:'article_tag',foreignKey:'articleId',otherKey:'tagId'})
        Article.belongsTo(models.user,{as:'author',foreignKey:'userId'})
    }
    return Article;
}