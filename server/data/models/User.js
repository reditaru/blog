/**
 * Created by Administrator on 2017/12/21.
 */
/**
 * Created by Administrator on 2017/12/21.
 */

export default function(sequelize,DataTypes){
    let User = sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username:DataTypes.STRING,
        password:DataTypes.STRING,
        name:DataTypes.STRING,
        avatar:DataTypes.STRING,
        email:DataTypes.STRING
    },{
        paranoid: true
    })
    User.associate = function (models) {
        User.hasMany(models.article,{as:'articles',foreignKey:'userId'})

    }
    return User;
}