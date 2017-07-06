'use strict';

/**
 * Global vars
 */

var source = 'src/';
var build = 'assets/';
var folder = {
    source: {
        img: source + 'img/**/*',
        svg: source + 'svg/**/*',
        fonts: source + 'fonts/**/*',
        css: source + 'css/*.scss',
        css_vendor: source + 'css/vendor/',
        js: source + 'js/*.js',
        js_vendor: source + 'js/vendor/',
    },
    build: {
        img: build + 'img/',
        svg: build + 'svg/',
        fonts: build + 'fonts/',
        css: build + 'css',
        js: build + 'js'
    }
}





/**
 * Invoke all libraries required to run GULP correctly
 */
var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jslint = require('gulp-jslint');
var flatten = require('gulp-flatten');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourceMaps = require('gulp-sourcemaps');
var imageMin = require('gulp-imagemin');
var rev = require('gulp-rev');






/**
 * Styles task. This includes the app custom styles plus any vendor library
 */

gulp.task('css', function() {

    // CLEAN ASSETS
    del.sync([folder.build.css], { read: false });

    // VENDOR
    gulp.src([folder.source.css_vendor + 'normalize.css'])
        .pipe(prefix())
        .pipe(cleanCSS())
        .pipe(minify())
        .pipe(concat('vendor.css'))
        .pipe(rev())
        .pipe(gulp.dest(folder.build.css));

    // APP CSS FILES
    return gulp.src(folder.source.css)
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourceMaps.write(''))
        .pipe(rev())
        .pipe(gulp.dest(folder.build.css));
});

gulp.task('default', ['css']);






/**
 * Scripts task. This includes the app custom scripts plus any vendor library
 */

gulp.task('js', function() {

    // CLEAN ASSETS
    del.sync([folder.build.js], { read: false });

    // VENDOR
    gulp.src([
            folder.source.js_vendor + 'moment-with-locales.min.js',
            folder.source.js_vendor + 'moment-timezone-with-data.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(rev())
        .pipe(gulp.dest(folder.build.js));

    // APP JS FILES
    return gulp.src(folder.source.js)
        .pipe(jshint())
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(sourceMaps.write(''))
        .pipe(flatten())
        .pipe(rev())
        .pipe(gulp.dest(folder.build.js));
});

gulp.task('default', ['css', 'js']);






/**
 * Static assets task
 */

gulp.task('static', function() {

    // CLEAN ASSETS
    del.sync([
        folder.build.img,
        folder.build.svg,
        folder.build.fonts
    ], { read: false });

    // VENDOR

    var img = gulp.src(folder.source.img)
        .pipe(imageMin())
        .pipe(rev())
        .pipe(gulp.dest(folder.build.img));

    var svg = gulp.src(folder.source.svg)
        .pipe(imageMin([imageMin.svgo({ plugins: [{ removeViewBox: true }] })]))
        .pipe(rev())
        .pipe(gulp.dest(folder.build.svg));

    var fonts = gulp.src(folder.source.fonts)
        .pipe(rev())
        .pipe(gulp.dest(folder.build.fonts));

    return img && svg && fonts;
});






/**
 * So that we can just call `gulp` in terminal
 */

gulp.task('default', ['css', 'js', 'static']);





/**
 * Add tasks to the Watch event
 */
gulp.task('watch', function() {
    gulp.watch(source + '**/*', ['css', 'js', 'static']);
});
