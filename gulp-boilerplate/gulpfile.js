var jshint = require('gulp-jshint');
var gulp = require('gulp');
const eslint = require('gulp-eslint');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace-task');
var dom  = require('gulp-dom');
var shell = require('gulp-shell');
var argv = require('yargs').argv;

gulp.task('testingArguments', function() {
    // console.log(process.argv);
    console.log(argv.x, argv.y);
});
gulp.task('gulpShellTask', function () {
    shell.task([
        process.chdir('brprpart'),
        'git add --all',
        'git commit -m '+argv.version+'',
        'git tag -a '+argv.version+' -m "'+argv.version+'"',
        'git push --tags',
        'git push origin'
    ])()
});

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