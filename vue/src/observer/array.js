
// 需要重写的会改变数组本身的方法（7个）：push, pop, shift, unshift, splice, reverse, sort
// 不会改变数组本身的方法就不用重写


// 这一步相当于将数组重写前的方法都保留
let oldArrayMethods = Array.prototype
// value.__proto__ =  arrayMethods
// arrayMethods.__proto__ = oldArrayMethods
// 当用户在data的数据上调用数组的方法是就会沿着原型链向上查找，其中arrayMethods中是重写的方法，
// 没找到就会向上查找到oldArrayMethods，调用原始的方法
export let arrayMethods = Object.create(oldArrayMethods)

const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
] 

methods.forEach(method => {
    arrayMethods[method] 
})