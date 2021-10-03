function myNew(GFun, ...arg) {
    let obj = new Object()
    obj.__proto__ = GFun.prototype
    let res = GFun.apply(obj, arg)
    return typeof res === 'object' && res !== null ? res : obj
}

function Test(name) {
    this.name = name
}
Test.prototype.getName = function() {
    console.log(this.name)
}

myNew(Test,'demi').getName()
