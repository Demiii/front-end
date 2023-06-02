class Node {
    name = ''
    left = null
    right = null
    constructor(name, left, right){
        this.name = name
        this.left = left || null
        this.right = right || null
    }
}

// 文章： https://blog.csdn.net/soundwave_/article/details/53120766

exports.A = new Node('A', 
    new Node('B', 
        null, 
        new Node('C', 
            new Node('D'))), 
    new Node('E', 
        null, 
        new Node('F', 
            new Node('G', 
                new Node('H'), 
                new Node('K')))))
        

        //         A
        // B                 E 
        //     C                 F 
        // D                 G 
        //                H      K