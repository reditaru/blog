/**
 * Created by Administrator on 2017/12/21.
 */

export default function(sequelize,DataTypes){
    let Category = sequelize.define('category',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:DataTypes.STRING
    },{
        paranoid: true
    })
    Category.associate = function (models) {
        Category.hasMany(models.article,{as:'articles',foreignKey:'categoryId'})
    }
    return Category;
}