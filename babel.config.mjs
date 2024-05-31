export default ({env}) => {
    const isProduction = env('production');
    return ({
        presets: [
            ['@babel/preset-env'],
            '@babel/preset-typescript'
        ],
        plugins: [
            ['@babel/plugin-transform-runtime', {
                useESModules: true
            }]
        ]
    });
};