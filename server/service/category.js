/**
 * Created by reditaru on 2017/12/22.
 */
import db from '../data/index'
import ServerError from '../util/ServerError'
import * as Toolkit from '../util/Toolkit'
export const getCategories = async()=>{
    let data =  await db.category.findAll();
    data = data.map((item)=>item.toJSON());
    return data;
}
export const getCategoriesAndArticles = async()=>{
    let data =  await db.category.findAll({
        include:[{model:db.article,as:'articles',include:[
            {model:db.tag,as:'tags',through:{attributes:[]}},
            {model:db.user,as:'author'}],
            order: [['createdAt', 'DESC']]}
        ]
    });
    data = data.map((item)=>item.toJSON());
    return data;
}
export const createCategory = async(name)=>{
    let category = await db.sequelize.transaction(
        async(t)=>{
            let category =
                await db.category.create({
                    name:name
                },{transaction:t});
            return category;
        }).catch((err)=>{
        throw new ServerError(`create fail! Error:${err.name}`,ServerError.DATA_TRANSACTION_FAIL)
    })
    return category.toJSON()
}
export const updateCategory = async (id,name)=>{
    let category =  await db.category.findById(id)
    Toolkit.assertNotNull(category,'The request category is not exist!')
    let result = await db.sequelize.transaction(
        async(t)=>{
            category =
                await category.updateAttributes({
                    name:name
                },{transaction:t});
            return category;
        })
    return result.toJSON()
}