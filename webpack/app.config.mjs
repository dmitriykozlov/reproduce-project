import { resolve } from 'node:path';
import packageJson from '../package.json' with { type: 'json' };
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import commonConfig, { logDecor } from './common.config.mjs';

const appConfig = () => {

  const dirName = import.meta.dirname;

  const outputFilePath = resolve(dirName, '../dist/');
  const version = packageJson.version;

  return {
    context: resolve(dirName, '../app'),
    entry: './index.js',

    output: {
      filename: `[id]_v${version}.js`,
      path: outputFilePath,
      clean: true
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Reproduce',
        filename: 'index.html',
        inject: 'body',
        scriptLoading: 'module'
      })
    ]
  };
};

export default logDecor(true, (env, argv) => merge(commonConfig(env, argv), appConfig(env, argv)));