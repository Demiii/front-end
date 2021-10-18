function add(x, y, z) {
    console.log('执行', x+y)
    return x+y
}

function createCurry(fn) {
    let len = fn.length
    let _args = []
    return function() {
        let arg_temp = Array.prototype.slice.call(arguments, 0)
        _args = Array.prototype.concat(_args, arg_temp)
        if(_args.length >= len) {
            fn.apply(null, arg_temp)
        }else {
            return arguments.callee
        }
    }
}





createCurry(add)(1)(2,3)