/**
 * Created by reditaru on 2017/12/22.
 */
class ServerError extends Error {
    static REQUEST_NULL_RESOURCE = 101
    static OPRATION_ON_EXISTING_RESOURCE = 102
    static DATA_TRANSACTION_FAIL = 103
    constructor(msg, status) {
        super();
        this.message = msg;
        this.status = status;
    }
}
export default ServerError;