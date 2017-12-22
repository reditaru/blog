/**
 * Created by reditaru on 2017/12/22.
 */
import Router from 'koa-joi-router'
import * as configService from '../../service/config'
import * as Toolkit from '../../util/Toolkit'
let config = new Router();
const Joi = Router .Joi;
const configValiate = {
    body: {
        icon: Joi.string().required(),
        github:Joi.string().required()
    },
    type: 'json'
}
config.get('/config',async(ctx)=>{
    let data = await configService.getConfig()
    ctx.body = Toolkit.assemblyResponseBody(data);
})
    .put('/config',{validate:configValiate},async(ctx)=>{
        let data = await configService.updateConfig(ctx.request.body);
        ctx.body = Toolkit.assemblyResponseBody(data);
    })

export default config;