/**
 * Created by reditaru on 2017/12/25.
 */
const cache = {};
export async function getCache(key, fn, params) {
    if (cache[key])
        return cache[key];
    else {
        if (typeof fn === 'function')
            cache[key] = await fn(params);
        else
            cache[key] = await fn;
        return cache[key];
    }
}
export async function updateCache(key, fn, params) {
    if (typeof fn === 'function')
        cache[key] = await fn(params);
    else
        cache[key] = await fn;
    return cache[key];
}