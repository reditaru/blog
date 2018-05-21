/**
 * Created by reditaru on 2017/12/21.
 */
import util from 'util'
import ServerError from './ServerError'
export function assertNotNull(obj, msg, status) {
    if (obj == null)
        throw new ServerError(msg, status || ServerError.REQUEST_NULL_RESOURCE);
}
export function assertNull(obj, msg, status) {
    if(obj != null)
        throw new ServerError(msg, status || ServerError.OPRATION_ON_EXISTING_RESOURCE);
}
//只支持basic type
export function assertEqual(source, target, msg, status) {
    if (source !== target)
        throw new ServerError(msg, status || ServerError.OPRATION_ON_EXISTING_RESOURCE);
}
export function copyProperties(source, ...ignoreProperties) {
    let result;
    if (util.isObject(source)) {
        if (util.isArray(source)) {
            result = []
            source.forEach((item) => {
                let newItem = {};
                for (let prop in item)
                    if (!ignoreProperties.includes(prop)) {
                        newItem[prop] = item[prop];
                    }
                result.push(newItem);
            });
        } else {
            result = {};
            for (let prop in source) {
                if (!ignoreProperties.includes(prop))
                    result[prop] = source[prop];
            }
        }
    }
    return result;
}

export function assemblyResponseBody(obj) {
    return {
        success: true,
        code: 100,
        res: obj
    }
}