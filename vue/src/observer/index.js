import { arrayMethods } from './array.js'
import {isObject} from '../utils/index'

// 把data中的数据都用Object.defineProperty进行重新定义，定义为访问器属性
// 但是Object.defineProperty不能兼容IE8，所以vue2无法兼容ie8版本

class Observe {
    constructor(value) {
        // vue中如果数据的层次过多，需要递归的去解析对象中的属性，依次使用Object.defineProperty增加属性的get 和 set方法
        // vue2.0中采用的是这种方式，vue3.0中采用的时proxy
        if(Array.isArray(value)) { 
            // 如果是数组，并不会对索引进行观察，因为会导致消耗过大，性能问题
            // 因为很少直接操作索引，一般都会通过数组的方法比如push,shift,unshift(需要对数组的方法进行重写)
            // 如果数组中的值是对象再观察
            value.__proto__ = 
            this.observerArray(value)
        }else { // 如果是对象
            this.walk(value)
        }
    }
    observerArray(data) {
        for(let i = 0; i < data.length; i++) {
            observe(data[i])
        }
    }
    walk(data) {
        for(let key in data) {
            defineReactive(data, key, data[key]) // 定义响应数据
        }
    }
}
function defineReactive(data, key, value) { 
    observe(value) // 递归实现深度检测
    Object.defineProperty(data, key, { // 数据劫持
        get() {
            return value
        },
        set(newValue) { // 利用闭包的性质
            if(newValue === value) return
            observe(value) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue
            console.log('值发生变化', value)
        }
    })
}

export function observe(data) {
    if(!isObject(data)) {
        return
    }else{
        return new Observe(data)
    }
}