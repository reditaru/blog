/**
 * Created by Administrator on 2017/12/21.
 */
import Router from 'koa-joi-router'
import {getArticles} from '../../service/article'
let view = new Router();
view.get('/',(ctx)=>{
    getArticles()
})

export default view;
