module.exports = function({types:t}) {
    return {
        // 访问者
        visitor: {
            // 变量声明节点对应的访问者方法
            VariableDeclaration(path) {
                // 该路径对应的节点
                const node = path.node;
                // 判断节点kind属性是let或者const, 转化为var
                ['let', 'const'].includes(node.kind) && (node.kind = 'var');
            },
            // 箭头函数节点对应的访问者方法
            ArrowFunctionExpression(path) {
                // 该路径对应的节点信息
                let { id, params, body, generator, async } = path.node
                // 进行节点替换 (arrowFunctionExpression->functionExpression)
                path.replaceWith(t.functionExpression(id, params, body, generator, async))
            }
        }
        
    }
}
