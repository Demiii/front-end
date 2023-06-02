function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child=>{
                return (
                    typeof child == 'object'
                        ? child
                        : createTextElement(child)
                )
            })
        }
    }
}


function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createDom(fiber) {
    const dom = fiber.type == 'TEXT_ELEMENT'
        ?  document.createTextNode("")
        : document.createElement(fiber.type)
    
}

function render(element, container) {
    nextUnitOfWork = { // 从根节点开始
        dom: container,
        props: {
            children: element
        },
        parent: null
    }
}

function workLoop(deadline) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
}

function performUnitOfWork(fiber) {
    // 1.处理当前工作单元
    if(!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }
    let elements = fiber.props.children
    let index = 0
    let prevSibling = null
    while(index < elements.length) {
        let element = elements[index]
        let newFiber = {
            dom: null,
            props: element.props,
            parent: fiber,
            type: element.type
        }
        if(index == 0) { // 第一个子节点
            fiber.child = newFiber
        }else{ // 兄弟节点
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }

    // 2.返回下一个工作单元
    if(fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while(nextFiber) {
        if(nextFiber.sibling){
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}

let nextUnitOfWork = null

function render1(element, container) {
    // 区分文本节点
    const dom = element.type == 'TEXT_ELEMENT'
        ?  document.createTextNode(element.nodeValue)
        :  document.createElement(element.type)
    // 节点属性
    Object.keys(element.props).forEach(prop=>{
        prop !== 'children' && (dom[prop] = element.props[prop])
    })
    container.appendChild(dom)

    // 递归的方式不可中断，会阻塞浏览器渲染，会阻塞浏览器响应其他事件
    // element.props.children.forEach(child=>{
    //     render(child, dom)
    // })

    // 优化： fiber
    function workLoop(deadline) {
        requestIdleCallback(workLoop)
    }
    requestIdleCallback(workLoop)

    // 执行当前任务，并返回下一个任务
    function performUnitOfWork(nextUnitOfWork) {

    }
}





const MyReact = {
    createElement,
    render
}


/** @jsx MyReact.createElement */
const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
)

const container = document.getElementById("root")
MyReact.render(element, container)