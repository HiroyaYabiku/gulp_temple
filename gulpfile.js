var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var del = require("del");


gulp.task('clean', function(){
  del(['dist'])
    .then(function(paths){
      console.log('deleted. ' + paths);
    });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('sass', function(){
  gulp.src('assets/sass/*.sass')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('ejs', function(){
  gulp.src(['assets/ejs/**/*.ejs', '!'+ 'assets/ejs/**/_*.ejs'])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('img', function(){
  gulp.src([
    'assets/img/**/*.png',
    'assets/img/**/*.jpg',
    'assets/img/**/*.jpeg',
    'assets/img/**/*.gif'])
    .pipe(gulp.dest('dist/img'));
});


// src 配下の *.html, *.css ファイルが変更されたリロード。
gulp.task('default', ['browser-sync','sass','ejs'], function () {
  gulp.watch('assets/**/*.sass', ['sass','bs-reload']);
  gulp.watch('assets/**/*.ejs', ['ejs','bs-reload']);
 // gulp.watch(["監視したいファイル"], ["行いたいタスク"])
});
