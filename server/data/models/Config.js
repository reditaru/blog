/**
 * Created by Administrator on 2017/12/21.
 */

export default function(sequelize,DataTypes){
    let Config = sequelize.define('config',{
        icon:DataTypes.STRING,
        github:DataTypes.STRING,
        weibo:DataTypes.STRING,
        twitter:DataTypes.STRING,
        mail:DataTypes.STRING,
        avatar:DataTypes.STRING,
        header:DataTypes.STRING,
        subHeader:DataTypes.STRING
    },{
        defaultScope: {
            attributes: {
                exclude: ['createdAt','updatedAt','deletedAt']
            }
        },
        timestamps:false
    })
    return Config;
}