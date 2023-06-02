module.exports =  {
    mode: 'development',
    // mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: __dirname + '/build/'
    }
}