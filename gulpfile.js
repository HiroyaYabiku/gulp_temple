var gulp = require('gulp');
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
      index: 'index.html'
    }
  });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('ejs', function() {
  gulp.src(['src/ejs/**/*.ejs', '!'+ 'src/ejs/**/_*.ejs'])
    .pipe(ejs())
    .pipe(rename({extname: 'html'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('img', function() {
  gulp.src(['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.gif'])
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('js', function() {
  gulp.src([
    'src/js/**/*.js',
  ])
    // .pipe(concat('bundle.js')) // jsファイル結合
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});


gulp.task('default', ['ejs', 'js', 'browser-sync'], function() {
  gulp.watch("src/ejs/**/*.ejs", ['ejs','bs-reload']);
});
