// 一层浅拷贝
function shallowClone(obj) {
    let newObj
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop]
        }
    }
    return newObj
}


// 深拷贝
function deepClone(obj) {
    let newObj = {}
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            if(typeof obj[prop] === 'object') {
                newObj[prop] = deepClone(obj[prop])
            }else{
                newObj[prop] = obj[prop]
            }
        }
    }
    return newObj
}