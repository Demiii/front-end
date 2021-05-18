let {test, foo} = require('./test')

// 有了实现call的经验，apply和call的区别就是传参方式，apply接收数组

Function.prototype.apply1 = function(obj, args) {
    // 非严格模式参数转换
    if(obj === null || obj === undefined) {
        obj = globalThis
    }else {
        obj = Object(obj)
    }

    obj[this.name] = this
    let argsTemp = []
    for (let i in args) {
        argsTemp.push('args['+i+']')
    }
    // 传参
    // let res = eval('obj[this.name]('+argsTemp+')')
    let res = obj[this.name](...args)
    delete obj[this.name]

    // 返回值
    return res
}
globalThis.value = 'demi test'

test.apply1(undefined, [1,2])