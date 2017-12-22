/**
 * Created by Administrator on 2017/12/21.
 */
import Router  from 'koa-joi-router'
import * as articleService from '../../service/article'
import * as tagService from '../../service/tag'
import * as categoryService from '../../service/category'
let view = new Router ();
view.get('/',async(ctx)=>{
    let data = await articleService.getArticles()
    ctx.body = data;
    })
    .get('/article/:id',async(ctx)=>{
        let data = await articleService.getArticleById(ctx.params.id)
        ctx.body = data;
    })
    .get('/tag/:id',async(ctx)=>{
        let data = await articleService.getArticlesByTagId(ctx.params.id)
        ctx.body = data;
    })
    .get('/category/:id',async(ctx)=>{
        let data = await articleService.getArticlesByCategory(ctx.params.id)
        ctx.body = data;
    })
    .get('/tags',async(ctx)=>{
        let data = await tagService.getTags();
        ctx.body = data;
    })
    .get('/categories',async(ctx)=>{
        let data = await categoryService.getCategories()
        ctx.body = data;
    })
    .get('/categories/articles',async(ctx)=>{
        let data = await categoryService.getCategoriesAndArticles()
        ctx.body = data;
    })
export default view;
