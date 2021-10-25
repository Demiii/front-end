Promise.race = (values)=>{
    if(!(values instanceof Array)) {
        throw new TypeError('要数组')
    }
    return new Promise((resolve, reject)=>{
        for(let i=0; i<values.length; i++) {
            let p = values[i]
            if(p instanceof Promise){
                p.then(resolve, reject)
            }else{
                resolve(p)
            }
        }
    })

}