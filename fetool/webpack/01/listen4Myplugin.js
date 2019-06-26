class Listen4Myplugin {
    apply(compiler) {
        compiler.hooks.myPlugin.tap('Listen4Myplugin', (data) => {
            console.log('@Listen4Myplugin', data);
        })
    }
}
module.exports = Listen4Myplugin;