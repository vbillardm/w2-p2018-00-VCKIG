'use strict';

let gulp = require('gulp');
let prefix = require('gulp-autoprefixer');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let sync = require('browser-sync').create();
let sugarss = require('sugarss');
let pixrem  = require('pixrem');
let postcss = require('gulp-postcss');
let cssimport = require('postcss-import');
let cssnext = require('postcss-cssnext');
let rename = require('gulp-rename');
let nested = require('postcss-nested');

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'sss', 'js'], function() {

    sync.init({
        server: './dist/'
    });

    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/sss/**/*.sss', ['sss']);
    gulp.watch('app/js/**/*.js', ['js']);
});

// Configure HTML tasks.
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
});

// Configure CSS tasks.
gulp.task('sss', function () {
  return gulp.src('app/sss/styles.sss')
    .pipe(postcss(
        [
            cssimport,
            cssnext(
                {browsers: ['last 2 version'],
                compress: true}
            ),
            pixrem,
            nested
        ],
        { parser: sugarss }
    ))
    .pipe(concat('style'))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
});

// Configure image stuff.
gulp.task('images', function () {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/sss/**/*.sss', ['sss']);
    gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('default', ['html', 'sss', 'js', 'images', 'serve']);
