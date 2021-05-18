let {test, foo} = require('./test')
// 基础版
Function.prototype.bind1 = function(obj, ...arg) {
    return ()=> {
        this.apply(obj, arg)
    }
}

test.bind1(foo, 'lalala')()
