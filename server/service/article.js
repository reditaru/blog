/**
 * Created by Administrator on 2017/12/21.
 */
import db from '../data/index'
import * as Toolkit from '../util/Toolkit'
import ServerError from '../util/ServerError'
export const getArticles = async ()=>{
    let data =  await db.article.findAll({
        include:[{model:db.category,as:'category'},
            {model:db.tag,as:'tags',through:{attributes:[]}},
            {model:db.user,as:'author'}
            ],
        order: [['createdAt', 'DESC']]
    })
    data = data.map((item)=>item.toJSON())
    return data;
}
export const getArticlesByTagId = async(tagId)=>{
    let tag = await db.tag.findById(tagId,{
        include:[{model:db.article,as:'articles',through:{attributes:[]},include:[{model:db.category,as:'category'},{model:db.user,as:'author'}], order: [['createdAt', 'DESC']]}]
    })
    Toolkit.assertNotNull(tag,'The request tag is not exist!')
    return tag.toJSON();
}
export const getArticlesByCategory = async (categoryId)=>{
    let category = await db.category.findById(categoryId,{
        include:[{model:db.article,as:'articles',include:[{model:db.tag,as:'tags',through:{attributes:[]}},{model:db.user,as:'author'}], order: [['createdAt', 'DESC']]}]
    })
    Toolkit.assertNotNull(category,'The request category is not exist!')
    return category.toJSON();
}
export const getArticleById = async (id)=>{
    let article =  await db.article.scope('content').findById(id,{
        include:[{model:db.category,as:'category'},
            {model:db.tag,as:'tags',through:{attributes:[]}},
            {model:db.user,as:'author'}
        ]
    })
    Toolkit.assertNotNull(article,'The request article is not exist!')
    article.updateAttributes({
        readCount:article.readCount+1
    });
    return article.toJSON();
}
export const createArticle = async (info)=>{
     let article = await db.sequelize.transaction(
         async(t)=>{
             let article =
                 await db.article.create({
                     title:info.title,
                     summary:info.summary,
                     content:info.content,
                     categoryId:info.category,
                     userId:info.author
                 },{transaction:t});
             if(info.tags && info.tags.length)
                 await article.addTags(info.tags,{transaction:t});
             return article;
         }).catch((err)=>{
            throw new ServerError(`create fail! Error:${err.name}`,ServerError.DATA_TRANSACTION_FAIL)
         })
    return article.toJSON()
}
export const updateArticle = async(id,info)=>{
    let article =  await db.article.findById(id,{
        include:[{model:db.category,as:'category'},
            {model:db.tag,as:'tags',through:{attributes:[]}},
            {model:db.user,as:'author'}
        ]
    })
    Toolkit.assertNotNull(article,'The request article is not exist!')
    let result = await db.sequelize.transaction(
        async(t)=>{
            article =
                await article.updateAttributes({
                    title:info.title,
                    summary:info.summary,
                    content:info.content,
                    categoryId:info.category,
                    userId:info.author
                },{transaction:t});
            if(info.tags && info.tags.length)
                article = await article.setTags(info.tags,{transaction:t});
            return article;
        })
    return result.toJSON()
};
