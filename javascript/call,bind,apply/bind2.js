Function.prototype.bind = function(){
  return ()=>{
    this.apply(arguments[0], arguments[1])
  }
}