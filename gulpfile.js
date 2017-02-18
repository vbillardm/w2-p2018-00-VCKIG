'use strict';

let gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    sync        = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'sass', 'js'], function() {

    sync.init({
        server: './dist/'
    });

    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['js']);
});

// Configure HTML tasks.
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
});


// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
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
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('default', ['html', 'sass', 'js', 'images', 'serve']);
