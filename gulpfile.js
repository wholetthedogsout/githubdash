// Require gulp and connect. The require function looks in
// the node_modules for a 'gulp' package and a 'gulp-connect'
// package, and returns the function or object exported from
// those packages. (More on exporting later.)
var gulp = require('gulp');
var connect = require('gulp-connect');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

// The default task is what runs when you type 'gulp' in the
// terminal. In this case, default depends on 'watch' and 'serve'
// tasks, so those tasks will run any time we tell 'default' to run.
gulp.task('default', ['css', 'watch', 'serve']);

// Serve is a name I made up. You could call it 'dostuff' or whatever.
// The task starts a connect server on port 8000 if you go to
// http://localhost:8000, you can see what is being served.
gulp.task('serve', function () {
  connect.server({
    root: './src', // Serve content out of the ./src folder
    port: 8000, // Serve on port 8000
    livereload: true // Allow us to reload the app in the browser at will
  });
});

// The watch task watches a directory for changes and tells the
// browser(s) connected to the server to refresh. I also made this name
// up. In fact, the only name that has intrinsic meaning to gulp is the
// 'default' task.
gulp.task('watch', function () {
  // Here, we tell gulp to watch ./src and any subfolders beneath it
  // and when any of those change, gulp will run the 'reload' task.
  gulp.watch('./src/**/*', ['reload']);
});

// The reload task tells the connect server to reload all browsers
gulp.task('reload', ['css'], function () {
  // This pipe thing is weird but awesome, and we'll talk about it in a
  // sec...
  gulp.src('./src/**/*').pipe(connect.reload());
});

// Deploy our src folder to gh-pages
gulp.task('deploy', function() {
  return gulp.src('./src/**/*').pipe(ghPages());
});

// Adding the CSS task
gulp.task('css', function () {
  return gulp.src('./src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./src/css'));
});
