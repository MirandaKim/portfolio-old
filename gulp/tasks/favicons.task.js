const gulp = require('gulp');

/****************************************************/
/*                                                 */
/*   Favicons Gulp Task                           */
/*                                               */
/************************************************/
/*

  - Run task 'gulp favicons' to move favicons into the development tmp file (~/tmp)
  - This file contains tasks for both development (gulp favicons) and production (gulp favicons--prod)
  - Task 'gulp favicons--prod' is intened to run from task 'gulp build' but can be run independently.
  - Files are not modified by this process--just copied over.

  *************
  * Contents: *
  *************

  # Configs
  # Development
  # Production

*/

/*************************************/
/*   # Configs                      */
/***********************************/

let iconSrc = [ // list of favicon image locations
  './src/assets/favicons/*.png'
];

let devDest = 'tmp'; // development destination
let prodDest = 'dist'; // production destination\

/*************************************/
/*   # Development                  */
/***********************************/

/*
  Copy favicons to the development destination
*/
gulp.task('favicons', gulp.series(() => {
  return gulp.src(iconSrc)
  .pipe(gulp.dest(devDest));
}));

/*************************************/
/*   # Production                   */
/***********************************/

/*
  Copy favicons to the production destination
*/
gulp.task('favicons--prod', gulp.series(() => {
  return gulp.src(iconSrc)
  .pipe(gulp.dest(prodDest));
}));
