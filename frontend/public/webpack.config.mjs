import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};