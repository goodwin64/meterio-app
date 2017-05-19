var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var del = require('del');
var path = require('path');

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build:css', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('build:js', function() {
    return gulp.src(['src/js/**/*.js', '!src/js/'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch:js', function() {
    return gulp.watch('js/**/*.js', ['build:js'])
});

gulp.task('copy-libs', function() {
    return gulp.src('src/_external-libs/*.js')
        .pipe(gulp.dest('dist/js/_external-libs'));
});
gulp.task('copy-views', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});
gulp.task('copy-index', function() {
    return gulp.src('src/views/*.html')
        .pipe(gulp.dest('dist/views'));
});
gulp.task('copy-server-data', function() {
    return gulp.src('src/server/*')
        .pipe(gulp.dest('dist/server'));
});
gulp.task('copy-assets', function() {
    return gulp.src('src/assets/images/*')
        .pipe(gulp.dest('dist/assets/images'));
});
// gulp.task('copy-path', function () {
//     return gulp.src('src/**/*.{jpg|png|html|json}')
//         .pipe(
//             gulp.dest(function(file) {
//                 console.log(file);
//                 return path.join('dist', path.dirname(file.path));
//             })
//         );
// });
gulp.task('copy', [
    'copy-libs',
    'copy-index',
    'copy-views',
    'copy-server-data',
    'copy-assets'
]);



gulp.task('default', [
    'clean',
    'copy',
    'build:css',
    'build:js'
]);