// instanceof


function _instanceof(instance, constructor) {
    let prototype = constructor.prototype
    // let proto = instance?._proto_
    let proto = Object.getPrototypeOf(instance)
    while(proto){
        if(proto === prototype) return true
        // proto = proto._proto_
        proto = Object.getPrototypeOf(proto)
    }
    return false
}