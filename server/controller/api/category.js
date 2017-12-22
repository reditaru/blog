/**
 * Created by reditaru on 2017/12/22.
 */
import Router from 'koa-joi-router'
import * as categoryService from '../../service/category'
import * as Toolkit from '../../util/Toolkit'
let category = new Router();
const Joi = Router .Joi;
const categoryValiate = {
    body: {
        name: Joi.string().required()
    },
    type: 'json'
}
category.get('/categories',async(ctx)=>{
        let data = await categoryService.getCategories()
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .post('/categories',{validate:categoryValiate},async(ctx)=>{
        let data = await categoryService.createCategory(ctx.request.body.name);
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .get('/categories/articles',async(ctx)=>{
        let data = await categoryService.getCategoriesAndArticles();
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .put('/category/:id',{validate:categoryValiate},async(ctx)=>{
        let data = await categoryService.updateCategory(ctx.params.id,ctx.request.body.name);
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
export default category;