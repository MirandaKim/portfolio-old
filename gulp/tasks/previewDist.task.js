const gulp = require('gulp');
const browserSync = require('browser-sync').create();

/****************************************************/
/*                                                 */
/*   Preview Distribution Task                    */
/*                                               */
/************************************************/
/*

  - Run task 'gulp previewDist' to preview the distribution content in the browser.
  - If no content is displayed, run 'gulp build' then try this task again.
  - This task previews the production site only.
    To preview the development site, see gulp task 'watch' (~/gulp/tasks/watch.task.js)

  *************
  * Contents: *
  *************

  # Configs
  # Preview Dist

*/

/*************************************/
/*   # Configs                      */
/***********************************/

let distPath = 'dist'; // location of distribution files

/*************************************/
/*   # Preview Dist                 */
/***********************************/

/*
  Preview production files in browser
*/
gulp.task('previewDist', () => {
  browserSync.init({
    notify: false, // False, don't show any notifications in the browser (default true)
    server: {
      baseDir: distPath // Location of distribution files
    }
  });
});
