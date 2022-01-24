let {test, foo} = require('./test')

Function.prototype.call1 = function(obj, ...arg) {
    let fn_n = Symbol('fn_name')
    obj[fn_n] = this
    let res = obj[fn_n](...arg)
    delete obj[fn_n]
    return res
}


Function.prototype.call2 = function() {
    let obj = arguments[0]
    let fn_n = Symbol('fn_name')
    obj[fn_n] = this
    let args = []
    args = Array.prototype.slice.call(arguments, 1)
    let res = obj[fn_n](...args)
    delete obj[fn_n]
    return res
}


test.call2(foo, 1, 3)