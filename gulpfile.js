const gulp = require('gulp');
require('./gulp/tasks/dev.task');
require('./gulp/tasks/build.task');
require('./gulp/tasks/copyGeneral.task');
require('./gulp/tasks/html.task');
require('./gulp/tasks/images.task')
require('./gulp/tasks/favicons.task');
require('./gulp/tasks/modernizr.task');
require('./gulp/tasks/previewDist.task');
require('./gulp/tasks/scripts.task');
require('./gulp/tasks/styles.task');
require('./gulp/tasks/watch.task');

/****************************************************/
/*                                                 */
/*   Gulp File (gulpfile.js)                      */
/*                                               */
/************************************************/
/*
  - Import all gulp tasks into this file
  - ONLY define default gulp task here
  - Include tasks and task sets into files under ./gulp/tasks

  *************
  * Contents: *
  *************

  # Default Task

*/


/********************************/
/*   # Default Task            */
/******************************/

gulp.task('default', gulp.series('dev', 'watch'));
