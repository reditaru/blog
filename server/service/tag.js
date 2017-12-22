/**
 * Created by reditaru on 2017/12/22.
 */
import db from '../data/index'
import ServerError from '../util/ServerError'
import * as Toolkit from '../util/Toolkit'
export const getTags = async()=>{
    let data =  await db.tag.findAll();
    data = data.map((item)=>item.toJSON());
    return data;
}
export const createTag = async(name)=>{
    let tag = await db.sequelize.transaction(
        async(t)=>{
            let tag =
                await db.tag.create({
                    name:name
                },{transaction:t});
            return tag;
        }).catch((err)=>{
        throw new ServerError(`create fail! Error:${err.name}`,ServerError.DATA_TRANSACTION_FAIL)
    })
    return tag.toJSON()
}
export const updateTag = async(id,name)=>{
    let tag =  await db.tag.findById(id)
    Toolkit.assertNotNull(tag,'The request tag is not exist!')
    let result = await db.sequelize.transaction(
        async(t)=>{
            tag =
                await tag.updateAttributes({
                    name:name
                },{transaction:t});
            return tag;
        })
        .catch((err)=>{
            throw new ServerError(`update fail! Error:${err.name}`,ServerError.DATA_TRANSACTION_FAIL)
        })
    return result.toJSON()
}
export const deleteTag = async(id)=>{
    let tag =  await db.tag.findById(id)
    Toolkit.assertNotNull(tag,'The request tag is not exist!')
    let result = await db.sequelize.transaction(
        async(t)=>{
            tag =
                await tag.destroy({transaction:t});
            return tag;
        })
        .catch((err)=>{
            throw new ServerError(`delete fail! Error:${err.name}`,ServerError.DATA_TRANSACTION_FAIL)
        })
    return result.toJSON();
}