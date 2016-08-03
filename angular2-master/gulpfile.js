var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    webpack = require('gulp-webpack'),
    del = require('del'),
    run = require('run-sequence'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'builds/development/',
    tsSrc = 'process/typescript/',
    testSrc = 'src/';
    testBuild = 'build/';

gulp.task('html', function() {
    gulp.src(testSrc + '**/*.html')
        .pipe(gulp.dest(testBuild));
});

gulp.task('partials', function() {
    gulp.src(testSrc + 'partials/**/*')
        .pipe(gulp.dest(testBuild+'partials'));
});

gulp.task('css', function() {
    gulp.src(testSrc + 'styles/**/*.css')
        .pipe(gulp.dest(testBuild + '/css'));
});

gulp.task('copylibs', function() {
    return gulp
        .src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js'
        ])
        .pipe(gulp.dest(testBuild + 'js/lib/angular2'));
});

gulp.task('typescript', function () {
    return gulp
        .src(testSrc + 'scripts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(testBuild + 'js/'));
});

gulp.task('watch', function() {
  gulp.watch(testSrc + '**/*.ts', ['typescript']);
  gulp.watch(testSrc + 'styles/*.css', ['css']);
  gulp.watch(testSrc + '**/*.html', ['html']);
});

gulp.task('clean:build', function(cb){
    del([testBuild], cb);
});

gulp.task('webserver', function() {
  gulp.src(testBuild)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['html', 'css', 'copylibs', 'typescript', 'watch'], function (callback) {
    run(['webserver'])
});

// gulp.task('webpackdemo', function() {
//     return gulp.src('src/entry.js')
//         .pipe(webpack( require('./webpack.config.js') ))
//         .pipe(gulp.dest('dist/'));
// });