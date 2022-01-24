function debounce1(fn, wait) {
    let timer
    return function(){
        if(timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(()=>{
          fn.call(this, ...arguments)
          timer = null
        }, wait)
    }
}


// 可选立即执行版
function debounce2(fn, wait, immediate=false) {
    let timer
    return function () {
      if(timer) {
        clearTimeout(timer)
      }else {
        immediate && fn.call(this, ...arguments)
      }
      timer = setTimeout(()=>{
        !immediate && fn.call(this, ...arguments)
        timer = null
      }, wait)
    }
  };