const pluginName = 'MyPlugin';
const {SyncHook}=require('tapable');

class myPlugin {
    constructor(options) {
        //用户自定义配置
        this.options = options;
        console.log('@plugin',this.options);
    }
    apply(compiler) {
        console.log('@plugin apply');
        // 实例化自定义事件
        compiler.hooks.myPlugin=new SyncHook(['data']);

        compiler.hooks.environment.tap(pluginName,()=>{
            // 广播自定义事件
            compiler.hooks.myPlugin.call('It`s my plugin');
            console.log('@environment');
        });
    }
}

module.exports=myPlugin;