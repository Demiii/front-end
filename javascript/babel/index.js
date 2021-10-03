// 手写babel插件 ———— 程序入口


const { transform } = require('babel-core')

const fs = require('fs')

// 获取字符串
const before = fs.readFileSync('./before.js', 'utf-8')

// 将字符串转为ast
const res = transform(`${before}`, 
    {
        plugins: [require('./plugin')]
    })

// 存在after.js删除
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');
// 写入转化后的结果到after.js
fs.writeFileSync('./after.js', res.code, 'utf8');