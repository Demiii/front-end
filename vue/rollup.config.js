import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js', // 入口文件
    output: {
        format: 'umd', // 模块化类型
        file: 'dist/umd/vue.js', //出口路径
        name: 'Vue', //  指定打包后全局变量的名字
        sourcemap: true // 开启源码调试 可以找到源码报错的位置
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        process.env.ENV === 'development'?serve({
            open: true, // 自动打开网页
            openPage: '/public/index.html', // 默认打开的HTML路径
            port: 3000,
            contentBase: ''
        }):null
    ]
}