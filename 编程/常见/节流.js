// throttle

function throttle(fn, wait, immediate = false) {
    let timer = null
    return ()=>{
        if(!timer) {
            immediate && fn.call(this)
            timer = setTimeout(()=>{
                !immediate && fn.call(this)
                timer = null
            }, wait)
        }
    }
}