/**
 * Created by Administrator on 2017/12/21.
 */
import Koa  from 'koa'
import views from'koa-views'
import serve from 'koa-static'
import mount from 'koa-mount'
import root from './controller/root'
import logger from 'koa-logger'
import cors from '@koa/cors'

const app = new Koa();
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err)
        ctx.body = {
            success: false,
            code:err.status,
            message: err.message,
        };
    }
});
app.use(logger())
app.use(views('views',{
}))
app.use(mount('/static',serve('../static/')))
app.use(root.middleware());
app.listen(3000)