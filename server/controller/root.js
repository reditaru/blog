/**
 * Created by Administrator on 2017/12/21.
 */
import Router from 'koa-joi-router'
import view from './view/index'
import articleApi from './api/article'
import categoryApi from './api/category'
import tagApi from './api/tag'
import configApi from './api/config'
import * as Cache from '../util/Cache'
import * as configService from '../service/config'
let root = new Router ();
let api = new Router();
api.prefix('/api')
api .use(async(ctx,next)=>{
    try{
        await next();
    }catch (err){
        console.log(err)
        ctx.body = {
            code:err.status||err.code,
            success:false,
            msg:err.message
        }
    }
})
    .use(articleApi.middleware())
    .use(categoryApi.middleware())
    .use(tagApi.middleware())
    .use(configApi.middleware())
root.use('',view.middleware())
    .get("*",async(ctx)=>{
        let config = await Cache.getCache('config',configService.getConfig)
        await ctx.render('404',{config:config});
    })
export {
    root,
    api
};