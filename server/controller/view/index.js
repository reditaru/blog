/**
 * Created by reditaru on 2017/12/21.
 */
import Router  from 'koa-joi-router'
import * as articleService from '../../service/article'
import * as tagService from '../../service/tag'
import * as categoryService from '../../service/category'
import * as configService from '../../service/config'
import * as Cache from '../../util/Cache'
import markdown from 'marked'
let view = new Router ();
view.get('/', async (ctx) => {
    let data = await articleService.getArticles();
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('articles', { articles: data, config: config });
})
.get('/articles', async (ctx) => {
    let data = await articleService.getArticles();
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('articles', { articles: data, config: config });
})
.get('/article/:id', async (ctx) => {
    let data = await articleService.getArticleById(ctx.params.id,true);
    let config = await Cache.getCache('config',configService.getConfig);
    await ctx.render('article',{article:data,markdown:markdown,config:config});
})
.get('/tag/:id', async (ctx) => {
    let data = await articleService.getArticlesByTagId(ctx.params.id);
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('tag', { tag: data, config: config });
})
.get('/category/:id', async (ctx) => {
    let data = await articleService.getArticlesByCategory(ctx.params.id);
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('category', { category: data, config: config });
})
.get('/tags', async (ctx) => {
    let data = await tagService.getTags();
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('tags', { tags: data, config: config });
})
.get('/categories', async (ctx) => {
    let data = await categoryService.getCategoriesAndArticles();
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('categories', { categories: data, config: config });
})
.get('/categories/articles', async (ctx) => {
    let data = await categoryService.getCategoriesAndArticles();
    let config = await Cache.getCache('config', configService.getConfig);
    await ctx.render('categories', { categories: data, config: config });
});
export default view;
