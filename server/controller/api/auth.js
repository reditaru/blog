/**
 * Created by reditaru on 2017/12/27.
 */
import Router from 'koa-joi-router'
import * as authService from '../../service/auth'
import * as Toolkit from '../../util/Toolkit'
let auth = new Router();
const Joi = Router .Joi;
const authValiate = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required()
    },
    type: 'json'
}
auth.post('/login',{validate:authValiate},async(ctx)=>{
        let data = await authService.login(ctx.request.body.username,ctx.request.body.password)
        ctx.body = Toolkit.assemblyResponseBody(data);
    })
    .post('/logout',{validate:{body:{id:Joi.number().required()},type:'json'}},async(ctx)=>{
        let data = await authService.logout(ctx.body.id);
        ctx.body = Toolkit.assemblyResponseBody(data);
    })

export default auth;