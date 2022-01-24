let {test, foo} = require('./test')

Function.prototype.bind1 = function(obj) {
    let _this = this
    return function() {
        let args = Array.prototype.slice.call(0)
        _this.call(obj, ...args)
    }
}

