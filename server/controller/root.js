/**
 * Created by Administrator on 2017/12/21.
 */
import Router from 'koa-joi-router'
import view from './view/index'
import articleApi from './api/article'
let root = new Router();
root.use('',view.middleware())
    .use('/api',articleApi.middleware())
export default root;