// 测试的obj对象
const obj = {
    // =========== 1.基础数据类型 ===========
    num: 0, // number
    str: '', // string
    bool: true, // boolean
    unf: undefined, // undefined
    nul: null, // null
    sym: Symbol('sym'), // symbol
    bign: BigInt(1n), // bigint

    // =========== 2.Object类型 ===========
    // 普通对象
    obj: {
        name: '我是一个对象',
        id: 1
    },
    // 数组
    arr: [0, 1, 2],
    // 函数
    func: function () {
        console.log('我是一个函数')
    },
    // 日期
    date: new Date(0),
    // 正则
    reg: new RegExp('/我是一个正则/ig'),
    // Map
    map: new Map().set('mapKey', 1),
    // Set
    set: new Set().add('set'),
    // =========== 3.其他 ===========
    [Symbol('1')]: 1  // Symbol作为key
};

// 4.添加不可枚举属性
Object.defineProperty(obj, 'innumerable', {
    enumerable: false,
    value: '不可枚举属性'
});

// 5.设置原型对象
Object.setPrototypeOf(obj, {
    proto: 'proto'
})

// 6.设置loop成循环引用的属性
obj.loop = obj



function deepClone(obj) {
    let map = new Map()
    let newObj = clone(obj)
    function clone(obj) {
        if(isObj(obj)) {
            // 循环引用
            if(map.get(obj)) {
                return map.get(obj)
            }
            // Date
            if(obj instanceof Date) {
                return new Date(obj)
            }
            // RegExp
            if(obj instanceof RegExp) {
                return new RegExp(obj)
            }
            // function
            if(typeof obj === 'function') {
                return new Function('return ' + obj.toString())()
            }
            if(obj instanceof Map) {
                let res = new Map()
                map.set(obj, res)
                obj.forEach((value, key)=>{
                    res.set(clone(key), clone(value))
                })
                return res
            }
            if(obj instanceof Set) {
                let res = new Set()
                map.set(obj, res)
                obj.forEach(value=>{
                    res.add(clone(value))
                })
                return res
            }
            if(obj instanceof Array) {
                let res = []
                map.set(obj, res)
                obj.forEach(value=>{
                    res.push(clone(value))
                })
                return res
            }
            // 获得所有对象自身键， 包括不可枚举键、symbol键
            let keys = Reflect.ownKeys(obj) //等于[...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
            let des = Object.getOwnPropertyDescriptors(obj)
            let res = Object.create(Object.getPrototypeOf(obj), des)
            map.set(obj, res)
            for(let key of keys) {
                res[key] = clone(obj[key])
            }
            return res
        }
        return obj
    }
    return newObj
}



function isObj(o) {
    if((typeof o === 'object' && o !== null) || typeof o === 'function') {
        return true
    }

    return false
}

let clonedObj = deepClone(obj)



// console.log('clonedObj == obj', clonedObj == obj)
// console.log('clonedObj.arr === obj.arr',  clonedObj.arr === obj.arr)
console.log(clonedObj)
