module.exports = {

    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],

    ignore: [
        '**/__tests__/**/*',
        '**/*.spec.ts',
        'src/database/**/*'
    ]

}