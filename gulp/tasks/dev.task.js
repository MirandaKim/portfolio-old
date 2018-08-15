const gulp = require('gulp');

require('./copyGeneral.task');
require('./images.task');
require('./favicons.task');
require('./scripts.task');
require('./styles.task');
require('./html.task');

/****************************************************/
/*                                                 */
/*   Dev Gulp Task                                */
/*                                               */
/************************************************/
/*

  - Run task 'dev' to process src files into a tmp directory for development (~/tmp)
  - The task will set the environment then call a series of other tasks.
  - This task does not include copying over image files and general files,
    those tasks should be called separately


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
/*   # Dev Sub Tasks                */
/***********************************/

/*******************
*  > Set Dev Env   *
*******************/

/*
  Set node environment to development
*/
gulp.task('dev_setDevEnv', gulp.series((done) => {
  let envVal = "development"; // environment value
  console.log(`Environment set to "${envVal}"`);
  process.env.NODE_ENV = envVal; // set environment value
  done();
}));

/*************************************/
/*   # Dev Task                     */
/***********************************/

/*
  Run series of development tasks
*/
gulp.task('dev', gulp.series( // run list of synchronous tasks
  'dev_setDevEnv', // set development environment
  'styles', // run styles task (development)
  'scripts', // run scripts task (development)
  'html', // run html task (development)
(done) => {
  console.log(`
      -- --- ---------------------------------- --- --
      -- --- Development Build Complete (~/tmp) --- --
      -- --- ---------------------------------- --- --
      `);
  done();
}));
