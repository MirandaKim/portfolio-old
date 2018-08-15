const gulp  = require('gulp');
const imagemin = require('gulp-imagemin');
/****************************************************/
/*                                                 */
/*   Images Gulp Task                             */
/*                                               */
/************************************************/
/*

  - Gulp task for optimizing image files for the destination directory
  - This file contains a task for development (gulp images) and a task for production (gulp images--prod)
  - The task 'gulp images--prod' is intended to be triggere by task 'gulp build' but can be run independently

  *************
  * Contents: *
  *************

  # Configs
  # Images Task
      > Development
      > Production

*/

/*************************************/
/*   # Configs                      */
/***********************************/

let devDest = './tmp/assets/images'; // development destination
let prodDest = './dist/assets/images'; // production destination

let imageSrc = [
    /* Images to optimize */
    `./src/assets/images/**/*`
    /* Exclude from optimization */
    //`!./src/assets/images/icons/**/*`, // consider excluding this path if there is a separarate task for sprite icons
    //`!./src/assets/images/icons/**/*` // consider excluding this path if there is a separarate task for sprite icons
  ];

let imageConfig = { // gulp-imagemin configuration
      progressive: true, // optimize jpg
      interlaced: true, // optimize gif
      multipass: true // optimize svg
}

/*************************************/
/*   # Images Task                  */
/***********************************/

/*******************
*  > Development   *
*******************/

/*
  Copy optimized versions of images files to the development destination
*/
gulp.task('images', gulp.series(() => {
  console.log('Optimizing images...')
  return gulp.src(imageSrc)
    .pipe(imagemin(imageConfig))
    .pipe(gulp.dest(devDest));
}));

/******************
*  > Production   *
******************/

/*
  Copy optimized versions of image files to the production destination
*/
gulp.task('images--prod', gulp.series(() => {
  console.log('Optimizing images...')
  return gulp.src(imageSrc)
    .pipe(imagemin(imageConfig))
    .pipe(gulp.dest(prodDest));
}));
