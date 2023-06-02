// new

// 1. 创建新对象 2.对象原型指向构造函数原型 3.构造函数this执行新对象 4.执行构造函数 5.构造函数返回非空对象时返回该非空对象，否则返回新对象。

function createObj(F, ...arg) {
    let o = Object.create(F.prototype)
    let res = F.call(o, ...arg)
    if(typeof res === 'object' && res !== null) return res
    return o
}