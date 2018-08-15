const path = require('path');

/****************************************************/
/*                                                 */
/*   Webpack Config -- Common                     */
/*                                               */
/************************************************/
/*

  - This is the webpack configuration common to both development and production environments.
  - This config is merged with the environment based configs in their respective files (./webpack.dev.js AND ./webpack.prod.js)

*/

module.exports = {
  entry: {
    app: './src/assets/scripts/App.js'
  },
  /*
  OUTPUT based on dev vs prod.
  See webpack.dev.js for development output
  and webpack.prod for prodiuction output.
  */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader' // babel config in ~/.babelrc
        }
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname)
    }
  }
}
