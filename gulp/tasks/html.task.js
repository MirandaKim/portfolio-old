const gulp = require('gulp');
const inject = require('gulp-inject');
const htmlmin = require('gulp-htmlmin');

/****************************************************/
/*                                                 */
/*   HTML Gulp Task                               */
/*                                               */
/************************************************/
/*

  - Run task 'html' to copy index.html to it's destination while injecting script and style links.
  - This file contains tasks for both development (gulp html) and production (gulp html--prod)
  - The task 'gulp html--prod' is intended to be triggere by task 'gulp build' but can be run independently

  *************
  * Contents: *
  *************

  # Configs
  # HTML Task
    > Development
    > Production
*/

/*************************************/
/*   # Configs                      */
/***********************************/

let srcRoot = 'src/index.html'; // location of src index.html

let devDest = 'tmp'; // development destination
let devInjectSrc = [ // files to inject into the development index.html
  'tmp/assets/styles/*.css',
  'tmp/assets/scripts/*.js'
];

let prodDest = 'dist'; // production destination
let prodInjectSrc = [ // files to inject into the production index.html
  'dist/**/*.js',
  'dist/**/*.css'
];

/*************************************/
/*   # HTML Task                    */
/***********************************/

/*******************
*  > Development   *
*******************/

/*
  Copy html file(s) to development destination and inject style/script files
*/
gulp.task('html', gulp.series(() => {
  return gulp.src(srcRoot) // get index template from src
  .pipe(gulp.dest(devDest)) // copy it into the destination directory
  .pipe(inject(gulp.src( // inject copied version with script and style links
    devInjectSrc,
    {read: false}
  ), {relative: true}))
  .pipe(gulp.dest(devDest)); // save copied version into destination directory
}));


/******************
*  > Production   *
******************/

/*
  Copy html file(s) to production destination and inject style/script files
*/
gulp.task('html--prod', gulp.series(() => {
  return gulp.src(srcRoot) // get index template from src
  .pipe(gulp.dest(prodDest)) // copy it into the destination directory
  .pipe(inject(gulp.src( // inject copied version with script and style links
    prodInjectSrc,
    {read: false}
  ), {relative: true}))
  .pipe(htmlmin({ // minify html
    collapseWhitespace: true,
    removeComments: true
    }))
  .pipe(gulp.dest(prodDest)); // save modified version into destination directory
}));
