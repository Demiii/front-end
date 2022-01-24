function patch(oldVNode, newVNode, el) {
    // 比较节点类型，如果类型都不同，直接卸载老节点，挂载新节点
    let oldVNodeType = oldVNode.vNodeType 
    let newVNodeType = newVNode.vNodeType
    if(oldVNodeType !== newVNodeType) {
        replaceVNode(oldVNode, newVNode, el)
    }else{ // 节点类型没有改变，只需要处理节点属性data和子元素children
        if(newVNodeType === VNodeTypes.HTML) {
            patchElement(oldVNode, newVNode, el)
        }else if(newVNodeType === VNodeTypes.TEXT) {
            patchText(oldVNode, newVNode, el)
        }
    }
}


/**
 * @description: html节点的比较
 * @param {*} oldVNode
 * @param {*} newVNode
 * @param {*} el
 * @return {*}
 */
function patchElement(oldVNode, newVNode,el) {
    const {tag: oldVNodeTag, data: oldVNodeData, children: oldChildren , childType: oldChildrenType, rDom} = oldVNode
    const {tag: newVNodeTag, data: newVNodeData, children: newChildren , childType: newChildrenType} = newVNode
    // 节点标签不同，直接替换节点
    if(oldVNodeTag !== newVNodeTag) {
        replaceVNode(oldVNode, newVNode, el)
    }else {
        // 处理属性
        processData(oldVNodeData, newVNodeData, rDom)
        // 处理子节点
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        patchChildren(oldChildren, oldChildrenType, newChildren, newChildrenType, el)
    }
}

/**
 * @description: 文本节点的比较
 * @param {*} oldVNode
 * @param {*} newVNode
 * @param {*} el
 * @return {*}
 */
function patchText(oldVNode, newVNode, el) {
    if(oldVNode.children !== newVNode.children) {
        oldVNode.el.nodeValue = newVNode.children
    }
}


/**
 * @description: 卸载老节点，挂载新节点【操作真实DOM】
 * @param {*} oldVNode
 * @param {*} newVNode
 * @param {*} el
 * @return {*}
 */
function replaceVNode(oldVNode, newVNode, el) {
    el.removeChild(oldVNode.rDom)
    if(newVNode) {
        mount(newVNode, el)
    }
}


function processData(oldData, newData, rDom) {
    // 更新
    if(newData) {
        for(let k in newData) {
            let oldValue = oldData[k]
            let newValue = newData[k]
            patchData(rDom, k, oldValue, newValue)
        }
    }
    // 删除新属性data中不存在的属性
    if(oldData) {
        for(let k in oldData) {
            let oldValue = oldData[k]
            if(oldValue && !newData.hasOwnProperty(k)) {
                rDom && patchData(rDom, k, oldValue, null)
            }
        }
    }
}

/**
 * @description: 处理子元素
 * @param {*} oldChildren
 * @param {*} oldChildrenType
 * @param {*} newChildren
 * @param {*} newChildrenType
 * @param {*} el
 * @return {*}
 */
function patchChildren(oldChildren, oldChildrenType, newChildren, newChildrenType, el) {
    // 原子元素为空节点
    if(oldChildrenType === ChildrenTypes.EMPTY) {
        switch(newChildrenType) {
            case ChildrenTypes.EMPTY:
                break;
            case ChildrenTypes.SINGLE:
                mountText(newChildren, el)
                break;
            case ChildrenTypes.MULTIPLE:
                if(newChildren) {
                    for(let i=0; i<newChildren.length; i++) {
                        mount(newChildren[i], el)
                    }
                }
                break;
            default:
                break;
        }
    }
    // 原子元素为文本节点
    if(oldChildrenType === ChildrenTypes.SINGLE) {
        switch(newChildrenType) {
            case ChildrenTypes.EMPTY:
                replaceVNode(oldChildren, null, el)
                break;
            case ChildrenTypes.SINGLE:
                patchText(oldChildren, newChildren, el)
                break;
            case ChildrenTypes.MULTIPLE:
                replaceVNode(oldChildren, null, el)
                if(newChildren) {
                    for(let i=0; i<newChildren.length; i++) {
                        mount(newChildren[i], el)
                    }
                }
                break;
            default:
                break;
        }
    }
    // 原子元素为数组
    if(oldChildrenType === ChildrenTypes.MULTIPLE) {
        switch(newChildrenType) {
            case ChildrenTypes.EMPTY:
                if(oldChildren) {
                    for(let i = 0; i<oldChildren.length; i++) {
                        replaceVNode(oldChildren[i], null, el)
                    }
                }
                break;
            case ChildrenTypes.SINGLE: 
                if(oldChildren) {
                    for(let i = 0; i<oldChildren.length; i++) {
                        replaceVNode(oldChildren[i], null, el)
                    }
                }
                mountText(newChildren, el)
                break;
            case ChildrenTypes.MULTIPLE:
                updateChildren(oldChildren, newChildren, el)
        }
    }

}


function updateChildren(oldChildren, newChildren, el) {
    let lastNewNodeInOldIndex = 0
    // 遍历新的子元素们，如果原来也有就patch，如果没有就插入（有顺序）
    for(let i=0; i<newChildren.length; i++) {
        let newVNode = newChildren[i]
        let isFind = false
        for(let j=0; j<oldChildren.length; j++) {
            let oldVNode = oldChildren[j]
            if(newVNode.data.key === oldVNode.data.key) {
                isFind = true
                patch(oldVNode, newVNode, el)
                // 顺序逆转，说明位置改变
                if(j<lastNewNodeInOldIndex) {
                    el.insertBefore(oldVNode.rDom, oldChildren[lastNewNodeInOldIndex].rDom)
                }else {
                    lastNewNodeInOldIndex = j
                }
                break;
            }
        }
        if(!isFind) {
            // 需要插入指定节点
            let flagDom = i === 0 ? oldChildren[0].rDom : newChildren[i-1].rDom.nextSibling;
            mount(newVNode, el, flagDom)
        }
    }
    // 遍历老的子元素们，如果新的子元素中没有则删除
    for(let i=0; i<oldChildren.length; i++) {
        let oldVNode = oldChildren[i]
        let isFind = false
        for(let j=0; j<newChildren.length; j++) {
            let newVNode = newChildren[j]
            if(newVNode.data.key === oldVNode.data.key) {
                isFind = true
                break;
            }
        }
        if(!isFind) {
            replaceVNode(oldVNode, null, el)
        }
    }
}