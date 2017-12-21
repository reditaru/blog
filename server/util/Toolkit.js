/**
 * Created by Administrator on 2017/12/21.
 */
export function assertNotNull(attribute,msg) {
    if(attribute==null)
        throw new Error(msg);
}
export function assertNull(attribute,msg) {
    if(attribute!=null)
        throw new Error(msg);
}