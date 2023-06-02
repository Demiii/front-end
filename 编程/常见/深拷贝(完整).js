let map = new WeakMap()
const clone = (target)=>{
  if(isObject(target)) {
    let res
    // data或者reg
    if(target instanceof Date) {
      return new Date(target)
    }
    if(target instanceof RegExp) {
      return new RegExp(target)
    }
    if(typeof target === 'function') {
      return new Function('return ' + target.toString())()
    }
    // 循环引用的
    if(map.has(target)){
      return map.get(target)
    }
    // map 可能出现循环引用,可能出现循环引用的都记录到map里
    if(target instanceof Map) {
      res = new Map()
      map.set(target, res)
      target.forEach((val, key)=>{
        res.set(clone(key), clone(val))
      })
      return res
    }
    // set 
    if(target instanceof Set) {
      res = new Set()
      map.set(target, res)
      target.forEach(val=>{
        res.add(clone(val))
      })
      return res
    }
    // array
    if(target instanceof Array) {
      res = new Array()
      map.set(target, res)
      target.forEach(val=>{
        res.push(clone(val))
      })
      return res
    }
    // 剩下的应该就是object了
    let allKeys = Reflect.ownKeys(target)
    let allDes = Object.getOwnPropertyDescriptors(target)
    res = Object.create(target.__proto__, allDes)
    map.set(target, res)
    allKeys.forEach(key=>{
      res[key] = clone(target[key])
    })
    return res

  }else {
    return target
  }
}

const isObject = (target)=>{
  let type = typeof target
  return type == 'object' || type == 'function'
}

let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.a = obj.b
obj.b.c = obj.a

console.log(obj)
let newObj = clone(obj)
console.log(newObj)
// date、reg、map、set、function，symbol和不可枚举的属性，循环引用的情况，原型链

