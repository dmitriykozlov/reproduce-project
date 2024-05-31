import {resolve} from 'node:path';

export const logDecor = (disable, fn) => {
    if (disable) return fn;
    return (...args) => {
        console.log(...args);
        const result = fn(args);
        console.log(result);
        return result;
    };
};

export default (env, argv) => {
    const dirName = import.meta.dirname;

    const isProduction = argv.mode === 'production';
    process.env.NODE_ENV = argv.mode;

    return {
        target: 'browserslist',
        mode: argv.mode,
        devtool: !isProduction ? 'source-map' : false,

        resolve: {
            extensions: ['.ts', '.js', '.json'],
            alias: {
                '@platf': resolve(dirName, '../platf'),
                '@': resolve(dirName, '../app'),
            },
            fallback: {
                stream: 'stream-browserify',
                buffer: 'buffer',
                path: 'path-browserify'
            }
        },

        output: {
            scriptType: 'module',
            chunkLoading: 'import',
            chunkFormat: 'module'
        },

        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /(node_modules|static\/js)/,
                    use: 'babel-loader'
                },
            ]
        },

        watchOptions: {
            aggregateTimeout: 6000,
            poll: 5000,
            ignored: /node_modules/
        },

        devServer: {
            hot: false,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                    runtimeErrors: false
                }
            },
            static: {
                directory: resolve(dirName, '../dist'),
                publicPath: '/'
            },
            port: 9090,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            historyApiFallback: true
        },

        optimization: {
            minimize: isProduction,
            chunkIds: 'deterministic',
            moduleIds: 'deterministic',
            portableRecords: true,
            removeAvailableModules: true //reduces build performance
        }
    };
}