var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cmq = require("gulp-combine-mq");
var csscomb = require('gulp-csscomb');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var minify = require("gulp-minify-css");
var reload = browserSync.reload;
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');


gulp.task('less', function() {
    gulp.src('source/less/style.less')
        .pipe(less())
        //.pipe(cmq())
        .pipe(autoprefixer())
        //.pipe(csscomb())
        .pipe(gulp.dest('source/css'))
        //.pipe(minify())
        //.pipe(rename('style.min.css'))
        //.pipe(gulp.dest('build/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('compress', function() {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(reload({
            stream: true
        }));
});

gulp.task('imagemin', function () {
    return gulp.src('source/img/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true,
            svgoPlugins: [{removeViewBox: false}],
            use: []
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('serve', ['less'], function() {
    browserSync.init({
        server: 'source/'
    });

    gulp.watch("source/less/**/*.less", ['less']);
    //gulp.watch("js/**/*.js", ['compress']);
    gulp.watch("source/js/*.js").on('change', reload);
    gulp.watch("source/*.html").on('change', reload);
});

gulp.task('default', ['less', 'serve']);
