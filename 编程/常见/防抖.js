// debounce
function debounce(fn, wait, immediate=false) {
    let timer = null
    return function() {
        if(timer) {
            clearTimeout(timer)
        }else{
            immediate && fn.call(this) 
        }
        timer = setTimeout(()=>{
            !immediate && fn.call(this)
            timer = null
        }, wait)
    }
}