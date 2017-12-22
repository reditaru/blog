/**
 * Created by Administrator on 2017/12/21.
 */

export default function(sequelize,DataTypes){
    let Tag = sequelize.define('tag',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:DataTypes.STRING
    },{
        defaultScope: {
            attributes: {
                exclude: ['createdAt','updatedAt','deletedAt']
            }
        },
        paranoid: true
    })
    Tag.associate = function (models) {
        Tag.belongsToMany(models.article,{as:'articles',through:'article_tag',foreignKey:'tagId',otherKey:'articleId',timestamps: false,onDelete: 'set null'})
    }
    return Tag;
}