const gulp = require('gulp');

/****************************************************/
/*                                                 */
/*   Copy General Files Gulp Task                 */
/*                                               */
/************************************************/
/*

  - Task for moving general files to the destination directory.
    These are files that would not otherwise be moved by the styles, scripts, index, or image processing tasks.
  - No optimization is included in these tasks.
  - This file contains a task for development (gulp copyGeneral) and a task for production (gulp copyGeneral--prod)
  - Task 'gulp copyGeneral--prod' is intened to run from task 'gulp build' but can be run independently

  *************
  * Contents: *
  *************

  # Configs
  # Copy General Tasks
    > Development
    > Production

*/

/*************************************/
/*   # Configs                      */
/***********************************/

let devDest = 'tmp'; // development destination
let prodDest = 'dist'; // production destination

let copyPaths = [ // Paths to copy, and NOT copy (!)
  // Paths to copy:
  `.src/**/*`,
  // Exclude from copy:
  `!.src/index.html`,
  `!.src/assets`,
  `!.src/assets/images/**`,
  `!.src/assets/styles/**`,
  `!.src/assets/scripts/**`,
  `!.src/tmp`,
  `!.src/tmp/**`
];

/*************************************/
/*   # Copy General Task            */
/***********************************/

/*******************
*  > Development   *
*******************/

/*
  Copy general files to the development destination
*/
gulp.task('copyGeneral', gulp.series(() => {
  console.log(`Copying General to directory ${devDest}`);
  return gulp.src(copyPaths)
    .pipe(gulp.dest(devDest));
}));

/*******************
*  > Production   *
*******************/

/*
  Copy general files to the production destination
*/
gulp.task('copyGeneral--prod', gulp.series(() => {
  console.log(`Copying General to directory ${prodDest}`);
  return gulp.src(copyPaths)
    .pipe(gulp.dest(prodDest));
}));
