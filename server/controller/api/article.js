/**
 * Created by Administrator on 2017/12/21.
 */
import Router  from 'koa-joi-router'
import * as articleService from '../../service/article'
import * as Toolkit from '../../util/Toolkit'
let article = new Router ();
const Joi = Router .Joi;
const articleValidate = {
    body: {
        title: Joi.string().required(),
        content: Joi.string().required(),
        summary: Joi.string().required(),
        tags:Joi.array().items(Joi.number()).required(),
        author:Joi.number().required(),
        category:Joi.number().required()
    },
    type: 'json'
}
article.get('/articles',async(ctx)=>{
        let data = await articleService.getArticles()
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .post('/articles',{ validate:articleValidate}, async(ctx)=>{
            let data = await articleService.createArticle(ctx.request.body);
            ctx.body = Toolkit.assemblyResponseBody(data);
        })
    .get('/article/:id',async(ctx)=>{
        let data = await articleService.getArticleById(ctx.params.id)
        ctx.body = Toolkit.assemblyResponseBody(data);
     })
    .put('/article/:id', {validate: articleValidate},async(ctx)=>{
            let data = await articleService.updateArticle(ctx.params.id,ctx.request.body)
            ctx.body = Toolkit.assemblyResponseBody(data);
        })
    .get('/tag/:id',async(ctx)=>{
        let data = await articleService.getArticlesByTagId(ctx.params.id)
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .get('/category/:id',async(ctx)=>{
        let data = await articleService.getArticlesByCategory(ctx.params.id)
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .delete('/article/:id',async(ctx)=>{
        let data = await articleService.deleteArticle(ctx.params.id)
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
export default article;