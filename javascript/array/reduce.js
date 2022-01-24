 Array.prototype.reduce1 = function(fn, start){
    let array = [...this]
    let res
    if(arguments.length === 2) {
        array.unshift(start)
    }
    switch(array.length){
        case 0:
            throw('不能是空数组')
            break
        case 1:
            res = array[0]
            break
        default:
            res = array[0]
            for(let i = 1; i<array.length; i++) {
                res = fn(res, array[i])
            }
    } 
    // console.log(res)
    return res
}

let reduceFn = function(before, after) {
    return before + after
}

let A = [1,2,3]
console.log(A.reduce1(reduceFn))