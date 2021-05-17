import {observe} from './observer/index'
export function initState(vm) {
    const opts = vm.$options
    // vue的数据来源:属性、方法、数据、计算属性、watch，这个顺序是固定的
    if(opts.props) {
        initProps(vm)
    }
    if(opts.methods) {
        initMethods(vm)
    }
    if(opts.data) {
        initData(vm)
    }
    if(opts.computed) {
        initComputed(vm)
    }
    if(opts.watch) {
        initWatch(vm)
    }
} 

function initProps(vm) {

}
function initMethods(vm) {

}
function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    vm._data = data
    // 数据劫持，在用户修改数据后，希望得到通知，进而刷新页面。也就是观察者模式
    // 这里就需要将data中的数据属性转换为访问器属性
    observe(data)

}
function initComputed(vm) {

}
function initWatch(vm) {

}