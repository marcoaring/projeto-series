var sourcemaps = require('gulp-sourcemaps');
var wait = require('gulp-wait');
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var pixrem = require('pixrem');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var order = require('run-sequence');

gulp.task('sass', function(){
    return gulp.src('css/sass/**/style.scss')
    .pipe(wait(50))
    .pipe(sourcemaps.init())
    .pipe(sass({
        'outputStyle': 'expanded'
        }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({
            browsers: ['last 5 versions']
        }),
        pixrem()
    ]))
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts', function(){
    return gulp.src(['js/jquery.min.js', 'js/vue.min.js', 'js/app-vue.js', 'js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('css', function(){
    return gulp.src(['css/style.css', 'css/materialize.min.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('default', function(){
    order(['sass', 'css', 'scripts'], function(){
        console.log('Compilation done!');
    });
});