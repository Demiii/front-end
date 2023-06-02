function createAsset(filename, fileContent) {
    if (/\.css$/.test(filename)) {
        fileContent = `
            const str = ${JSON.stringify(fileContent)};
            exports = str
        `
    }
    return fileContent
}

exports.createAsset = createAsset