// 可选立即执行版
function throttle(fn, wait, immediate=false) {
    let timer 
    return function() {
      if(!timer){
        immediate && fn.call(this, ...arguments)
        timer = setTimeout(()=>{
          !immediate && fn.call(this, ...arguments)
          timer = null
        }, wait)
      }
    }
  };