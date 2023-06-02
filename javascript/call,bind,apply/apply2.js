Function.prototype.apply = function(){
  if(!Array.isArray(arguments[1])) {
    console.error('参数要数组')
    return
  }
  let obj = arguments[0] ?? window
  let fnName = Symbol[this.name]
  obj[fnName] = this
  let res = obj[fnName](...arguments[1])
  delete obj[fnName]
  return res
}