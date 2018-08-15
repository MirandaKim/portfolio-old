const gulp = require('gulp');
const modernizr = require('gulp-modernizr');

/****************************************************/
/*                                                 */
/*   Modernizr Gulp Task                          */
/*                                               */
/************************************************/
/*

  - Run task 'gulp modernizr' to create a modernizr script within ~/src/tmp
  - Access this modernizr script by importing into ~/src/scripts/Vendors.js
  - This task is intended to be triggerd by 'gulp scripts' and 'gulp sripts--prod',
    but it can be triggered independently.
  - See modernizr config to include additional options: ~/modernizr.config.json

  *************
  * Contents: *
  *************

  # Configs
  # Modernizr Task

*/

/*************************************/
/*   # Configs                      */
/***********************************/

var modernizrConfig = require('../../modernizr.config.json');
let src = [ // files to process though modernizr
  './src/assets/styles/**/*.css',
  './src/assets/scripts/**/*.js'
];

let tempDest = './src/assets/tmp'; // destination to be accessed by source script files

/*************************************/
/*   # Modernizr Task               */
/***********************************/

/*
  Create modernizr script in temporary destination
*/
gulp.task('modernizr', gulp.series(() => {
  return gulp.src(src)
  .pipe(modernizr(modernizrConfig))
  .pipe(gulp.dest(tempDest));
}));
