var jshint = require('gulp-jshint');
var gulp = require('gulp');
const eslint = require('gulp-eslint');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace-task');
var dom  = require('gulp-dom');


// gulp.task('lint', function() {
//     return gulp.src('./document-links.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

gulp.task('htmlreplaceTaskExample', function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'htmlRep': 'papa'
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('replaceTaskExample', function () {
    gulp.src('./index.html')
        .pipe(replace({
            patterns: [
                {
                    match: 'foo',
                    replacement: 'bar'
                }
            ]
        }))
        .pipe(gulp.dest('buildTwo'));
});

gulp.task('domTask', function() {
    return gulp.src('./index.html')
        .pipe(dom(function(){
            // var hh = this.querySelectorAll('body')[0].innerHTML.match(/{{.*/);
            // var pp = this.querySelectorAll('.papa')[0].innerHTML;

            // this.querySelectorAll('body')[0].innerHTML.match(/{{.*/g).innerHTML = "papa";
            // console.log(pp[0]);
            // var qq = pp[0].replace('{{' , '.').replace('}}' , '.');
            // this.getElementById('mama').innerHTML='<!--#include virtual="'+qq+'"-->';
            return this;
        }))
        .pipe(gulp.dest('./buildThree/'));
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])

        .pipe(eslint())

        .pipe(eslint.format())

        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});