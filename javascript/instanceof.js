function myInstanceof(object, type) {
  let object_p = object.__proto__
  while(object_p) {
     if(object_p == type.prototype) return true
     else {
      object_p = object_p.__proto__
     }
  }
  return false
}