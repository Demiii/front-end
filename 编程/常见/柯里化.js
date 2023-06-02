// 柯里化

function add(x, y, z) {
    console.log('执行', x+y+z)
    return x+y
}

function createCurry(fn){
    let argArr = []
    let argLen = fn.length
    return function (){
        argArr = argArr.concat(Array.from(arguments))
        if(argArr.length >= argLen) {
            return fn(...argArr)
        }else{
            return arguments.callee
        }
    }
}
createCurry(add)(1)(2,3)
