/**
 * Created by Administrator on 2017/12/21.
 */
import util from 'util'
import ServerError from './ServerError'
export function assertNotNull(obj,msg) {
    if(obj==null)
        throw new ServerError(msg,ServerError.REQUEST_NULL_RESOURCE);
}
export function assertNull(obj,msg) {
    if(obj!=null)
        throw new ServerError(msg,ServerError.OPRATION_ON_EXISTING_RESOURCE);
}
export function copyProperties(source,...ignoreProperties) {
    let result;
    if(util.isObject(source)){
        if(util.isArray(source)){
            result = []
            source.forEach((item)=>{
                let newItem = {}
                for(let prop in item)
                    if(!ignoreProperties.includes(prop)){
                        newItem[prop] = item[prop];
                    }
                result.push(newItem)
            })
        }else{
            result = {}
            for(let prop in source) {
                if (!ignoreProperties.includes(prop))
                    result[prop] = source[prop]
            }
        }
    }
    return result;
}

export function assemblyResponseBody(obj) {
    return {
        success:true,
        code:100,
        res:obj
    }
}