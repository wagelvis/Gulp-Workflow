'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      cssnano = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      pug = require('gulp-pug'),
      htmlmin = require('gulp-htmlmin'),
      browserSync = require('browser-sync').create();

gulp.task('default', ['styles', 'javascript', 'htmlmin'], ()=>
    browserSync.init({
       server: "./dist"
    }),

    gulp.watch('./lib/*.js', ['javascript']).on('change', browserSync.reload),
    gulp.watch('./scss/**/*.scss', ['styles']),
    gulp.watch('./pug/**/*.pug', ['pug']),
    gulp.watch('./html_src/*.html', ['htmlmin']),
    gulp.watch('./dist/*.html').on('change', browserSync.reload)

);

gulp.task('javascript', function () {
    gulp.src('./lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('styles', ()=>
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

gulp.task('htmlmin', function() {
    return gulp.src('./html_src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

// Tareas que no requieren ser ejecutadas en tiempo real

gulp.task('imagemin', () =>
gulp.src('./img_src/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
);