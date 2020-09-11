module.exports = {
    presets: [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: '3.6.4',
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-react'
    ]
}