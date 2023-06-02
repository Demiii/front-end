// Function.prototype.apply()
Function.prototype.apply = function(context=Window, args) {
    let fnName = Symbol('fn')
    context[fnName] = this
    let res = context[fnName](...args)
    delete context[fnName]
    return res
}

// Function.prototype.call()
Function.prototype.call = function(context=Window, ...args) {
    let fnName = Symbol('fn')
    context[fnName] = this
    let res = context[fnName](...args)
    delete context[fnName]
    return res
}

// Function.prototype.bind()
Function.prototype.bind = function(context=Window, ...args) {
    let fnName = Symbol('fn')
    context[fnName] = this
    return ()=>{
        let res = context[fnName](...args)
        delete context[fnName]
        return res
    }
}
