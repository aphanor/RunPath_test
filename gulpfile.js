var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-sourcemap'),
    rename = require("gulp-rename"),
    sass = require("gulp-ruby-sass"),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    fs = require('fs');

// Dev source code    
var sassfiles = 'source/sass/*.scss';
var js = 'source/js/*.js';
var css = 'prod/css/';

// Production source code
var html = 'prod/*.html';
var minified_css = 'prod/css/*.css';
var minified_js = 'prod/js/*.js';

var js_all = 'prod/js/';
 
    // Sass & CSS configuration
    gulp.task('sass', function () {
        return sass(sassfiles, {style: 'compressed', sourcemap: false})
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            .pipe(concat('all.css'))
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(gulp.dest('prod/css/'));
    });
    
    
    // Uglify configuration 
    gulp.task('minify_task', function() {
        return gulp.src(['source/js/*.js', '!source/js/*.min.js'])
        .pipe(uglify().on('error', gutil.log))
        .pipe(concat('all.js'))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('prod/js/'));
    });
    
    // Watch items
    gulp.task('js', function() {
        gulp.src(js)
    });
    
    gulp.task('html', function() {
        gulp.src(html)
    });
    
    gulp.task('css', function() {
        gulp.src(sassfiles)
    });
    
    // Watch task
    gulp.task('watch', function() {
    
        gulp.watch(js, ['minify_task']).on('change', function(file) {
            gutil.log(gutil.colors.yellow('This JavaScript file ' + ' (' + file.path + ') has been updated.'));
        });
        
        gulp.watch(html, ['html']).on('change', function(file) {
            gutil.log(gutil.colors.cyan('This HTML' + ' (' + file.path + ') has been changed.'));
        });
        
        gulp.watch(sassfiles, ['sass']).on('change', function(file) {
            gutil.log(gutil.colors.grey('Running Sass compression from: ' + ' (' + file.path + ')'));
        });
    });
    
    // Webserver
    gulp.task('webserver', ['sass'], function() {
        gulp.src('prod/')
        .pipe(webserver({
        	livereload: true,
        	open: true
        }));
    });
    
    // Set of tasks
    gulp.task('default', ['minify_task', 'watch', 'html', 'js', 'webserver']);