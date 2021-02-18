import webpack from 'webpack';
import path from 'path';

interface WebpackEnvironment {
  production: boolean;
}

export default (e?: WebpackEnvironment): webpack.Configuration => {
  const config: webpack.Configuration = {
    mode: e?.production ? 'production' : 'development',
    devtool: e?.production ? false : 'inline-source-map',
    context: path.resolve(__dirname, 'src/main/js'),
    entry: {
      ydj: './index.ts',
    },
    output: {
      filename: e?.production ? 'ydj.min.js' : 'ydj.js',
      library: 'ydj',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx'],
    },
    target: 'web',
    watch: e?.production ? false : true,
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  };
  return config;
};
