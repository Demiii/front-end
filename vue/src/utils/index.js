 
/**
 *
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export function isObject(data) {
    if(typeof data !== 'object' || data === null) {
        return false
    }
    return true
}