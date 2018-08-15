const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

/****************************************************/
/*                                                 */
/*   Watch Gulp Task                             */
/*                                               */
/************************************************/
/*

  - Watch tasks intend to update the browser when changes are made to the specified files.
    These updates will trigger either a browser refresh or an injection (files changed without refresh).
  - Watch task uses BrowserSync to connect with the browser(s)
  - This watch task only preview the generated development files. If no content is displayed,
    run 'gulp dev' (and optional: 'gulp images', 'gulp favicons', 'gulp copyGeneral'...).
  - To preview the production site, see gulp task previewDist (~/gulp/tasks/previewDist.task.js)

  *************
  * Contents: *
  *************

  # Imports
  # Watch Task
    > HTML
    > Scripts
    > Styles

*/

/********************************/
/*   # Watch Task              */
/******************************/

/*
  Use a port to preview the development files while watching for changes.
*/
gulp.task('watch', gulp.series(() => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "tmp"
    }
  });

  /*************
  *   > HTML   *
  **************
  If the working index.html is modified, reload the browser(s)
  */
  watch('./src/index.html', gulp.series('html', () => {
    browserSync.reload();
  }));

  /****************
  *   > Scripts   *
  *****************
  If any of the working script files are modified, reload the browser(s)
  */
  watch('./src/assets/scripts/**/*.js', gulp.series('scripts', () => {
    browserSync.reload();
  }));

  /***************
  *   > Styles   *
  ****************
  If any of the working style files are modified, sync the css (task: cssInject)
  (this will update the browser window to the current css WITHOUT refreshing)
  */
  watch('./src/assets/styles/**/*.css', gulp.series('styles', () => {
    return gulp.src('./tmp/assets/styles/styles.css')
    .pipe(browserSync.stream());
  }));
}));
