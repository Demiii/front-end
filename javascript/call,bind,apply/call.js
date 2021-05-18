let {test, foo} = require('./test')


// 无参数版本，给传入对象添加一个属性，指向要执行的方法，执行完后，删除该属性
Function.prototype.call1 = function(obj) {
    obj[this.name] = this
    obj[this.name]()
    delete obj[this.name]
}

// 有参数版本，通过eval实现
Function.prototype.call2 = function(obj) {
    obj[this.name] = this
    let args = []
    for(let i = 1; i<arguments.length; i++) {
        args.push('arguments['+i+']')
    }
    // eval('obj[this.name]('+args+')')
    obj[this.name](...([...arguments].slice(1)))
    delete obj[this.name]
}


// 当传入对象为null时，非严格模式下指向全局对象
Function.prototype.call3 = function(obj) {
    // 非严格模式下，如果传入的不是对象，会转换一下，传入为undefined和null时，指向全局对象，否则转换为Object
    if(obj === null || obj === undefined) {
        obj = globalThis
    }else {
        obj = Object(obj)
    }

    obj[this.name] = this
    let args = []
    for(let i = 1; i<arguments.length; i++) {
        args.push('arguments['+i+']')
    }
    // eval('obj[this.name]('+args+')')
    obj[this.name](...([...arguments].slice(1)))
    delete obj[this.name]
}

// 处理返回值
Function.prototype.call4 = function(obj) {
    // 非严格模式下，如果传入的不是对象，会转换一下，传入为undefined和null时，指向全局对象，否则转换为Object
    if(obj === null || obj === undefined) {
        obj = globalThis
    }else {
        obj = Object(obj)
    }

    obj[this.name] = this
    let args = []
    for(let i = 1; i<arguments.length; i++) {
        args.push('arguments['+i+']')
    }
    // let res = eval('obj[this.name]('+args+')')
    let res = obj[this.name](...([...arguments].slice(1)))
    delete obj[this.name]
    return res
}

test.call2(foo, 'lala1', 'lala2')