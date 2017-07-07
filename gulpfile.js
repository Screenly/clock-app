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
        js: source + 'js/*.js',
    },
    build: {
        img: build + 'img/',
        svg: build + 'svg/',
        fonts: build + 'fonts/',
        css: build + 'css/',
        js: build + 'js/'
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
var rename = require("gulp-rename");
var intercept = require('gulp-intercept');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');




/**
 * Static assets task
 */

gulp.task('assets', function() {

    // CLEAN
    del.sync([
        folder.build.img,
        folder.build.css,
        folder.build.js,
        'rev-manifest.json'
    ], { read: false });

    // IMAGES
    return gulp.src(folder.source.img)
        .pipe(imageMin())
        .pipe(rev())
        .pipe(gulp.dest(folder.build.img))
        .pipe(rev.manifest({ base: build, merge: true }))
        .pipe(gulp.dest(build))
        .on('end', function() {

            console.log ('DONE IMAGES');

            // CSS
            gulp.src(folder.source.css)
                .pipe(sourceMaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(cleanCSS())
                .pipe(rev())
                .pipe(sourceMaps.write(''))
                .pipe(gulp.dest(folder.build.css))
                .pipe(rev.manifest({ base: build, merge: true }))
                .pipe(gulp.dest(build))
                .on('end', function() {
            
                    console.log ('DONE CSS');

                    // JS
                    gulp.src(folder.source.js)
                        .pipe(jshint())
                        .pipe(sourceMaps.init())
                        .pipe(uglify())
                        .pipe(rev())
                        .pipe(sourceMaps.write(''))
                        .pipe(gulp.dest(folder.build.js))
                        .pipe(rev.manifest({ base: build, merge: true }))
                        .pipe(gulp.dest(build))
                        .on('end', function() {

                            console.log ('DONE JS');

                            var manifest = gulp.src("rev-manifest.json");

                            // CSS MANIFEST
                            gulp.src(folder.build.css + '*.css')
                            .pipe(revReplace({manifest: manifest}))
                            .pipe(gulp.dest(folder.build.css));

                            // CSS MANIFEST
                            gulp.src(folder.build.js + '*.js')
                            .pipe(revReplace({manifest: manifest}))
                            .pipe(gulp.dest(folder.build.js));

                            // HTML MANIFEST
                            gulp.src(source + "index.html")
                            .pipe(revReplace({manifest: manifest}))
                            .pipe(gulp.dest('./'));
                        });
                });
        });
});





/**
 * Add tasks to the Watch event
 */
gulp.task('watch', function() {
    gulp.watch(source + '**/*', ['assets']);
});




/**
 * So that we can just call `gulp` in terminal
 */
gulp.task('default', ['assets']);
