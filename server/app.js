/**
 * Created by Administrator on 2017/12/21.
 */
import Koa  from 'koa'
import views from'koa-views'
import serve from 'koa-static'
import mount from 'koa-mount'
import root from './controller/root'
import logger from 'koa-logger'
import * as Cache from './util/Cache'
import * as configService from './service/config'
import cors from '@koa/cors'

const app = new Koa();
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err)
        let config = await Cache.getCache('config',configService.getConfig)
        await ctx.render('error',{err:err,config:config});
    }
});
app.use(logger())
app.use(views(__dirname+'/views',{
    extension:'jade'
}))
app.use(mount('/static',serve('static/')))
app.use(mount('/semantic',serve('semantic/')))
app.use(root.middleware());
app.listen(3000)