const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

/****************************************************/
/*                                                 */
/*   Webpack Config -- Development                 */
/*                                               */
/************************************************/
/*

  - This is the webpack config specific to the development environment.
  - In this file, the development config is merged with the common webpack config (./webpack.common.js).
  - This config is implemented via the gulp scripts task 'scripts' (./gulp/tasks/scripts.js).

*/

module.exports = merge(common, {
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'tmp/assets/scripts'),
      filename: '[name].js'
    },
});
