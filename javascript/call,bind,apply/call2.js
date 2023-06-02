Function.prototype.call = function(){
  let obj = arguments[0] ?? window
  let fnName = Symbol(this.name)
  obj[fnName] = this
  let res = obj[fnName](...Array.prototype.slice(arguments, 1))
  delete obj[fnName]
  return res
}