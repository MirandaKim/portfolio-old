const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

/****************************************************/
/*                                                 */
/*   Webpack Config -- Production                 */
/*                                               */
/************************************************/
/*

  - This is the webpack config specific to the production environment.
  - In this file, the production config is merged with the common webpack config (./webpack.common.js).
  - This config is implemented via the gulp scripts task 'scripts--prod' (./gulp/tasks/scripts.js).

*/

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].[hash].js'
  },
});
