/**
 * Created by reditaru on 2017/12/22.
 */
import Router from 'koa-joi-router'
import * as configService from '../../service/config'
import * as Toolkit from '../../util/Toolkit'
import * as Cache from '../../util/Cache'
let config = new Router();
const Joi = Router.Joi;
const configValiate = {
    body: {
        icon: Joi.string().required(),
        github: Joi.string().required(),
        avatar: Joi.string().required(),
        weibo: Joi.string().required(),
        header: Joi.string().required(),
        subHeader: Joi.string().required(),
        mail: Joi.string().required(),
        twitter: Joi.string().required()
    },
    type: 'json'
};
config.get('/config', async (ctx) => {
    let data = await configService.getConfig();
    ctx.body = Toolkit.assemblyResponseBody(data);
})
.put('/config', { validate: configValiate }, async (ctx) => {
    let data = await configService.updateConfig(ctx.request.body);
    Cache.updateCache('config', data);
    ctx.body = Toolkit.assemblyResponseBody(data);
});

export default config;