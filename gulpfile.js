'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var prettify = require('gulp-prettify');
var rev = require('gulp-rev-append');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require("gulp-uglify");

gulp.task('app:css', function(){
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compress'
        }))
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('app:css:prefix', ['app:css'], function(){
    return gulp
        .src('./dist/css/bundle.css')
        .pipe(autoprefixer({
            browsers: ['last 1 version', '> 1%', 'Firefox ESR']
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('app:js:browserify', function() {
    return browserify('./src/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('app:html:build', function(){
    gulp.src('./src/index.html')
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('app:html:prettify', function () {
    gulp.src('./**/*.html').
    pipe(prettify({
        indent_size: 2,
        indent_inner_html: true,
        unformatted: ['pre', 'code']
    })).
    pipe(gulp.dest('./'));
});

gulp.task('app:watch', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
            middleware: [historyApiFallback()]
        }
    });
    gulp.watch('./src/sass/**/*.scss', ['app:css','app:css:prefix']);
    gulp.watch('./src/js/**/*.js', ['app:js:browserify']);
    gulp.watch('./src/index.html', ['app:html:build']);
    gulp.watch('./dist/**/*').on('change', browserSync.reload);
});

gulp.task('default',['app:css',
                     'app:css:prefix',
                     'app:js:browserify',
                     'app:html:build',
                     'app:html:prettify',
                     'app:watch'
]);