// 寄生组合
function extend(Super, Sub) {
    Sub = function(){
        Super.call(this)
        Sub.call(this)
    }
    Sub.prototype = Super.prototype
    Sub.prototype.constructor = Sub
    return Sub
}