/**
 * Created by reditaru on 2017/12/22.
 */
import Router from 'koa-joi-router'
import * as tagService from '../../service/tag'
import * as Toolkit from '../../util/Toolkit'
let tag = new Router();
const Joi = Router .Joi;
const tagValiate = {
    body: {
        name: Joi.string().required()
    },
    type: 'json'
}
tag.get('/tags',async(ctx)=>{
    let data = await tagService.getTags()
    ctx.body = Toolkit.assemblyResponseBody(data);
})
    .post('/tags',{validate:tagValiate},async(ctx)=>{
        let data = await tagService.createTag(ctx.request.body.name);
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .put('/tag/:id',{validate:tagValiate},async(ctx)=>{
        let data = await tagService.updateTag(ctx.params.id,ctx.request.body.name);
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .delete('/tag/:id',async(ctx)=>{
        let data = await tagService.deleteTag(ctx.params.id)
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
export default tag;