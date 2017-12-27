/**
 * Created by reditaru on 2017/12/27.
 */
import db from '../data/index'
import jwt from 'jsonwebtoken'
import * as Toolkit from '../util/Toolkit'
import config from '../config'
export async function login(username,password) {
    const AUTH_FAIL_MSG = 'Authentication Fail!';
    let user = await db.user.scope('valid').findOne({
        where:{
            username:username,
        }
    });
    Toolkit.assertNotNull(user,AUTH_FAIL_MSG);
    Toolkit.assertEqual(password,user.password,AUTH_FAIL_MSG);
    let info = Toolkit.copyProperties(user.toJSON(),'password');
    let token = jwt.sign({username:user.username,id:user.id},config.auth.secret,{expiresIn:config.auth.expiresIn})
    info.token = token;
    if(user.id === config.admin.id)
        info.type = 'admin'
    return info;
}
export async function logout(userId) {
    return {}
}