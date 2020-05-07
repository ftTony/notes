// Karma configuration
// Generated on Tue May 05 2020 20:19:17 GMT+0800 (中国标准时间)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        // 解析所有模式的基本路径
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // 选择测试框架，我们选择'jasmine'
        frameworks: ["jasmine"],

        // list of files / patterns to load in the browser
        // 在浏览器中加载的切尔西的文本列表
        files: ["jasmine/*.js", "test/*.js"],

        // list of files / patterns to exclude
        // 要排队列表
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // 覆盖源文件 不包括测试库文件
        preprocessors: {
            'jasmine/*.js': ['coverage']
        },
        // plugins: [
        //     // 'karma-jasmine',
        //     'karma-coverage'
        // ],
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // 怎么显示测试结果

        reporters: ["progress", "coverage"],

        // 新增的配置项
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        // web server port
        // 服务器的端口号
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // 在输出中启用 / 禁用颜色
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // 显示日志记录的级别
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // 当任何测试文件更改时候，启用/禁用监听文件并执行测试
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // 启动浏览器
        browsers: ["Chrome"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // 持续集成模式，默认就好
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        // 并发级别，可以同时启动多少个浏览器，默认无限大
        concurrency: Infinity,
    });
};