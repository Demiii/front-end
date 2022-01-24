function createAsset(filename, fileContent) {
    if (/\.css$/.test(filename)) {
        fileContent = `
            const str = ${JSON.stringify(fileContent)};
            if(document) {
                let styleDom = document.createElement('style');
                styleDom.innerHTML = str;
                document.head.appendChild(styleDom);

            }
            exports = str
        `
    }
    return fileContent
}

exports.createAsset = createAsset