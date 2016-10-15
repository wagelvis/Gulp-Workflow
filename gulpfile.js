'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      cssnano = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      pug = require('gulp-pug'),
      htmlmin = require('gulp-htmlmin'),
      browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], ()=>
    browserSync.init({
       server: "./dist"
    }),

    gulp.watch('./lib/*.js', ['compress']),
    gulp.watch('./scss/**/*.scss', ['sass']),
    gulp.watch('./pug/**/*.pug', ['pug']),
    gulp.watch('./html_src/*.html', ['minify']),
    gulp.watch('./dist/*.html').on('change', browserSync.reload)

);

gulp.task('compress', function (cb) {
    pump([
            gulp.src('./lib/*.js'),
            uglify(),
            gulp.dest('./dist/js')
        ],
        cb
    );
});

gulp.task('sass', ()=>
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
);

gulp.task('pug', function buildHTML() {
    return gulp.src('./pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./html_src'))
});

gulp.task('minify', function() {
    return gulp.src('./html_src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['serve']);

// Tareas que no requieren ser ejecutadas en tiempo real

gulp.task('imagemin', () =>
gulp.src('./img_src/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
);