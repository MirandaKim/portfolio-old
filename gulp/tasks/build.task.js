const gulp = require('gulp');
const del = require('del');

require('./copyGeneral.task');
require('./images.task');
require('./scripts.task');
require('./styles.task');
require('./html.task');

/****************************************************/
/*                                                 */
/*   Build Gulp Task                              */
/*                                               */
/************************************************/
/*

  - Run task 'build' to optimize src content within the dist directory
  - This will run a series of production tasks to create a complete production site.
  - Existing produciton files will be DELETED to make room for the new ones.
  - To preview the production site, see task previewDist (~/gulp/tasks/previewDist.task.js)

  *************
  * Contents: *
  *************

  # Configs
  # Build Sub Tasks
    > Set Prod Env
    > Begin Clean
  # Build Task

*/

/*************************************/
/*   # Configs                      */
/***********************************/

let distPath = './dist';
let workingPath = './src';

/*************************************/
/*   # Build Sub Tasks              */
/***********************************/

/********************
*  > Set Prod Env   *
********************/

/*
  Set node environment to production
*/
gulp.task('build_setProdEnv', gulp.series((done)=>{
  let envVal = "production"; // environment value
  console.log(`Environment set to "${envVal}"`);
  process.env.NODE_ENV = envVal; // set environment value
  done();
}));

/*******************
*  > Begin Clean   *
*******************/

/*
  Delete any existing production files (to make room for the new ones).
*/
gulp.task('build_beginClean', gulp.series(() => {
  console.log('Deleting distribution directory...');
  return del(distPath);
}));


/*************************************/
/*   # Build Task                   */
/***********************************/

/*
  Run list of production build tasks
*/
gulp.task('build', gulp.series(
  'build_setProdEnv',
  'build_beginClean',
  'copyGeneral--prod',
  'images--prod',
  'scripts--prod',
  'styles--prod',
  'html--prod',
  (done) => {
    console.log(`
      -- --- ----------------------- --- --
      -- --- BUILD COMPLETE (~/dist) --- --
      -- --- ----------------------- --- --
      `);
    done();
}));
