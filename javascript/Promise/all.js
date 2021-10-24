Promise.all = (values)=>{
    if(!(values instanceof Array)) {
        throw new TypeError('要数组')
    }
    return new Promise((resolve, reject)=>{
        let valueList = []
        let resolvedCount = 0
        let resolveProcess = (i, value)=>{
            valueList[i] = value
            resolvedCount ++
            if(resolvedCount === values.length) {
                resolve(valueList)
            }
        }
        for(let i=0; i<values.length; i++) {
            let p = values[i]
            if(p instanceof Promise) {
                p.then((v)=>{
                    resolveProcess(i, v)
                }, err=>{
                    reject(err)
                } )
            }else{
                resolveProcess(i, p)
            }
            
        }
    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok1');
    }, 1000);
  })
  
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok2');
    }, 1000);
  })
  
  Promise.all([1,2,3,p1,p2]).then(data => {
    console.log('resolve', data);
  }, err => {
    console.log('reject', err);
  })