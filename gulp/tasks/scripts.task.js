
const gulp = require('gulp');
const webpack = require('webpack');

require('./modernizr.task');

/****************************************************/
/*                                                 */
/*   Scripts Gulp Task                            */
/*                                               */
/************************************************/
/*

  - Gulp task for processing/bundling script files.
  - This file contains a task for development (gulp scripts) and a task for production (gulp scripts--prod)
  - Task 'gulp scripts--prod' is intened to run from task 'gulp build' but can be run independently
  - Webpack is used for bundling, see webpack.<env>.js at root for more details.

  *************
  * Contents: *
  *************

  # Configs
  # Scripts Task
      > Development
      > Production
      > Common

*/

/*************************************/
/*   # Configs                      */
/***********************************/

  let webpackDev = '../../webpack.dev.js'; // Location of webpack config for development environment
  let webpackProd = '../../webpack.prod.js'; // Location fo webpack config for production environment

/*************************************/
/*   # Scripts Task                 */
/***********************************/

/*******************
*  > Development   *
*******************/

/*
  Process and bundle script files into the development destination
*/
gulp.task('scripts', gulp.series('modernizr',(done) => {
  webpack(require(webpackDev), (err, stats) => {
    handleResults(err, stats);
    done(); // DONE!
  });
}));

/******************
*  > Production   *
******************/

/*
  Process and bundle script files into the production destination
*/
gulp.task('scripts--prod', gulp.series('modernizr', (done) => {
  webpack(require(webpackProd), (err, stats) => {
    handleResults(err, stats);
    done(); // DONE!
  });
}));


/**************
*  > Common   *
**************/


function handleResults(err, stats){
  if(err){
    // Show error message
    console.log('WEBPACK ERROR:');
    console.log(err.toString);
  }
  // Show stats in console
  console.log(stats.toString());
}
