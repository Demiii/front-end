// Array.prototype.filter()

Array.prototype.filter = function(fn, context) {
    if(this == undefined) throw new TypeError('this is null or undefined!')
    if(typeof fn !== 'function') throw new TypeError('callback is not function!')
    let res = []
    let o = Object(this)
    for(let i = 0; i<o.length; i++) {
        if(i in o) {
            if(fn.call(context, o[i], i, o)) res.push(o[i])
        }
    }
}

// Array.prototype.map()

Array.prototype.map = function(fn, context) {
    if(this == undefined) throw new TypeError('this is null or undefined!')
    if(typeof fn !== 'function') throw new TypeError('callback is not function!')
    let res = []
    let o = Object(this)
    for(let i = 0; i<o.length; i++) {
        if(i in o) {
            res.push(fn.call(context, o[i], i, o))
        }
    }
}

// Array.prototype.forEach()

Array.prototype.forEach = function(fn, context) {
    if(this == undefined) throw new TypeError('undefined')
    if(typeof fn !== 'function')  throw new TypeError('not function')
    let o = Object(this)
    for(let i = 0; i < o.length; i++) {
        if(i in o) {
            fn.call(context, o[i], i, o)
        }
    }
}

// Array.prototype.reduce()
Array.prototype.reduce = function(fn, firstValue) {
    if(this == undefined) throw new TypeError('undefined')
    if(typeof fn !== 'function')  throw new TypeError('not function')
    let o = Object(this)
    let firstIndex = 0
    if(firstValue == undefined) { // 不传初始值，默认取用0位
        firstValue = o[0]
        firstIndex = 1
    }
    let res = firstValue
    for(let i = firstIndex; i < o.length; i++) {
        if(i in o) {
            res = fn(res, o[i], i, o)
        }
    }
    return res
}