let {test, foo} = require('./test')

Function.prototype.apply1 = function() {
    let obj = arguments[0]
    // 非严格模式下
    if(obj === undefined || obj === null) {
        obj = globalThis
    }
    // 保证属性名的唯一性，避免修改obj原有属性
    let funName = Symbol('fn_name')
    obj[funName] = this
    let args = arguments[1]
    let res = obj[funName](...args)
    // 删除添加的属性，避免污染对象
    delete obj[funName]
    return res
}

test.apply1(foo, [3,4])