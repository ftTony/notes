const babelConfig = {
    presets: [
        '@babel/env',
        '@babel/preset-react'
    ],
    'plugins': [
        [
            'import', {
                'libraryName': 'antd', 'libraryDirectory': 'lib'
            },
            'ant'
        ], [
            'import',
            { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib' },
            'antd-mobile'
        ],
        '@babel/plugin-proposal-class-properties'
    ]
};

module.exports = babelConfig