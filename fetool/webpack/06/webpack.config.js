
module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        filename: "[name].min.js", // index.min.js
        chunkFilename: '[name].bundle.js', // bundle.js
    }
}