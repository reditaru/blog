/**
 * Created by reditaru on 2017/12/22.
 */
import db from '../data/index'
import * as Toolkit from '../util/Toolkit'

export const getConfig = async()=>{
    let data =  await db.config.findById(1);
    return data.toJSON();
}
export const updateConfig = async(info)=>{
    let config =  await db.config.findById(1)
    Toolkit.assertNotNull(config,'The request config is not exist!')
    let result = await db.sequelize.transaction(
        async(t)=>{
            config =
                await config.updateAttributes({
                    icon:info.icon,
                    github:info.github
                },{transaction:t});
            return config;
        })
        .catch((err)=>{
            throw new ServerError(`update fail! Error:${err.name}`,ServerError.DATA_TRANSACTION_FAIL)
        })
    return result.toJSON()
}