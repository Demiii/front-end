// import {C} from './diff'
// tag的类型：HTML标签，组件，文本
// children的类型：无，单个子节点（文本），数组
const VNodeTypes = {
    HTML: 'HTML',
    COMPONENT: 'COMPONENT',
    TEXT: 'TEXT'
}

const ChildrenTypes = {
    EMPTY: 'EMPTY',
    SINGLE: 'SINGLE',
    MULTIPLE: 'MULTIPLE'
}


/**
 * @description: 创建虚拟DOM
 * @param {*} tag
 * @param {*} data
 * @param {*} children
 * @return {*}
 */
function createElement(tag, data, children) {
    let vNodeType
    if(typeof tag === 'string') {
        vNodeType = VNodeTypes.HTML    }else if(typeof tag === 'function') {
        vNodeType = VNodeTypes.COMPONENT
    }

    let childType
    if(children === undefined || children === null) {
        childType = ChildrenTypes.EMPTY
    }else if(Array.isArray(children)) {
        childType = children.length > 0 ? ChildrenTypes.MULTIPLE : ChildrenTypes.EMPTY
    }else {
        childType = ChildrenTypes.SINGLE
        children = createTextVNode(children)
    }
    return {
        vNodeType,
        tag,
        data,
        childType,
        children
    }
}



/**
 * @description: 创建虚拟文本节点
 * @param {*} text 
 * @return {*}
 */
function createTextVNode(text) {
    return {
        vNodeType: VNodeTypes.TEXT,
        tag: null,
        data: null,
        childType: ChildrenTypes.EMPTY,
        children: text,
    }
}


/**
 * @description: 渲染，如果是首次渲染，就挂载，如果不是首次渲染就diff
 * @param {*} vNode 虚拟DOM
 * @param {*} el 挂载节点
 * @return {*}
 */
function render(vNode, el) {
    if(el.vNode) {
        patch(el.vNode, vNode, el)
    }else {
        mount(vNode, el)
    }
    el.vNode = vNode
}


/**
 * @description: 挂载
 * @param {*} vNode
 * @param {*} el
 * @return {*}
 */
function mount(vNode, el, fNode) {
    let {vNodeType} = vNode
    // 不同节点类型，挂载分别处理
    if(vNodeType === VNodeTypes.HTML) {
        mountElement(vNode, el, fNode)
    }else if(vNodeType === VNodeTypes.TEXT) {
        mountText(vNode, el, fNode)
    }
}


/**
 * @description: 挂载元素节点，先创建元素，递归的创建子元素，所以最先挂载的是节点元素
 * @param {*} vNode
 * @param {*} el
 * @return {*}
 */
function mountElement(vNode, el, fNode) { 
    let {childType, children, tag, data} = vNode
    let dom = document.createElement(tag)
    vNode.rDom = dom
    // 处理属性
    for(let key in data) {
        patchData(dom, key, null, data[key])
    }


    if(childType === ChildrenTypes.SINGLE) {
        mount(children, dom)
    }else if(childType === ChildrenTypes.MULTIPLE) {
        for(let i=0; i<children.length; i++) {
            mount(children[i], dom)
        }
    }
    fNode ? el.insertBefore(dom, fNode) : el.appendChild(dom)
}


/**
 * @description: 挂载文本节点
 * @param {*} vNode
 * @param {*} el
 * @return {*}
 */
function mountText(vNode, el, fNode) {
    let {children, data} = vNode
    let dom = document.createTextNode(children)
    vNode.rDom = dom
    // 处理属性
    for(let key in data) {
        patchData(dom, key, null, data[key])
    }
    fNode ? el.insertBefore(dom, fNode) : el.appendChild(dom)
}


/**
 * @description: 处理属性
 * @param {*} dom
 * @param {*} key
 * @param {*} oldValue
 * @param {*} newValue
 * @return {*}
 */
function patchData(dom, key, oldValue, newValue) {
    switch(key){
        // 写入新的style，同时清除之前的style
        case 'style':
            if(newValue) {
                for(let k in newValue) {
                    dom.style[k] = newValue[k]
                }
            }
            if(oldValue && newValue) {
                for(let k in oldValue) {
                    if(!newValue.hasOwnProperty(k)) {
                        dom.style[k] = ''
                    }
                }
            }
            break;
        case 'class':
            dom.className = newValue
            break;
        default: 
            dom.setAttribute(key, newValue)
            break;
    }
}




// let vDom = createElement('div', {id:'test'}, [createElement('p', {class: 'item'})])
// console.log(JSON.stringify(vDom, null, 2))