var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

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
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('ejs', function(){
  gulp.src('assets/**/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});

// src 配下の *.html, *.css ファイルが変更されたリロード。
gulp.task('default', ['browser-sync','sass','ejs'], function () {
  gulp.watch('assets/**/*.sass', ['sass','bs-reload']);
  gulp.watch('assets/**/*.ejs', ['ejs','bs-reload']);
 // gulp.watch(["監視したいファイル"], ["行いたいタスク"])
});
