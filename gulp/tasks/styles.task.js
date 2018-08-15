const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const mixins = require('postcss-mixins');
const hexRgba = require('postcss-hexrgba');
const presetEnv = require('postcss-preset-env');

/****************************************************/
/*                                                 */
/*   Styles Gulp Task                             */
/*                                               */
/************************************************/
/*

  - Postcss is used to process the style files. See "Configs" below for list of PostCSS plugins.
  - An error handler is included so browsersync will not be interrupted if watch task is active
  - This file contains a task for development (gulp styles) and a task for production (gulp styles--prod)
  - Task 'gulp styles--prod' is intened to run from task 'gulp build' but can be run independently
  - There may by a PostCSS config file at the root of the file, but that was intentionally created
    and left without logic to prevent an error. All PostCSS config should be located in this file.

  *************
  * Contents: *
  *************

  # Configs
  # Style Tasks
    > Development
    > Production

*/

/*************************************/
/*   # Configs                      */
/***********************************/

var srcStyles = './src/assets/styles/styles.css'; // style source files

var destDev = './tmp/assets/styles'; // development destination for processed style files
var destProd = './dist/assets'; // production destination for processed style files

let basePlugins = [ // include plugins common to all process environments
  cssImport,
  mixins,
  cssvars,
  nested,
  hexRgba,
  autoprefixer,
  presetEnv
];

let devPlugins = []; // include any plugins unique to the development environment

let prodPlugins = []; // include any plugins unique to the production environment

/*************************************/
/*   # Styles Tasks                 */
/***********************************/

/*******************
*  > Development   *
*******************/

/*
  Process and bundle styles files into development destination
*/
gulp.task('styles', gulp.series(() => {
  console.log('Loading styles for a development environment...');
  let plugins = basePlugins.concat(devPlugins);
  return gulp.src(srcStyles)
  .pipe(postcss(plugins)) // postcss processing
  .on('error', function(errorInfo){ // hande error (keep the watch task from breaking)
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest(destDev));
}));

/*******************
*  > Production   *
*******************/

/*
  Process, bundle and minimize style files into production destination
*/
gulp.task('styles--prod', gulp.series(() => {
  console.log('Loading styles for a production environment...');
  let plugins = basePlugins.concat(prodPlugins);
  return gulp.src(srcStyles)
  .pipe(postcss(plugins)) // postcss processing
  .pipe(cssnano()) // minimize resulting css
  .on('error', function(errorInfo){ // handle error
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest(destProd));
}));
