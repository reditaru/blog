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
root.use('',view.middleware())
    .use('/api',articleApi.middleware())
    .use('/api',categoryApi.middleware())
    .use('/api',tagApi.middleware())
    .use('/api',configApi.middleware())
    .get("*",async(ctx)=>{
        let config = await Cache.getCache('config',configService.getConfig)
        await ctx.render('404',{config:config});
    })
export default root;