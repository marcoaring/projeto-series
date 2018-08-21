var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    wait = require('gulp-wait'),
    postcss = require('gulp-postcss'),
	pixrem = require('pixrem'),
	autoprefixer = require('autoprefixer'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-uglifycss'),
	rename = require('gulp-rename'),
    mmq = require('gulp-merge-media-queries'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

gulp.task('sass', function(){
    gulp.src('css/sass/**/style.scss')
    	.pipe(sourcemaps.init())
    	.pipe(sass({
        	errLogToConsole: true,
            outputStyle: 'compact',
            precision: 10
        }).on('error', sass.logError))
    	.pipe(postcss([
        	autoprefixer({
            	browsers: ['last 5 versions']
        	}),
        	pixrem()
    	]))
    	.pipe(sourcemaps.write({ includeContent: false }))
    	.pipe(sourcemaps.init({ loadMaps: true }))
    	.pipe(gulp.dest('./'))
        .pipe(mmq())
    	.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss({ maxLineLen: 10 }))
        .pipe(gulp.dest('./'));
});

gulp.task('vendorCSS', function(){
    gulp.src('css/vendor/*.css')
        .pipe(concat('vendor.css'))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 5 versions']
            }),
            pixrem()
        ]))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('scripts', function(){
    gulp.src('js/custom/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(
            rename({
                basename: 'main',
                suffix: '.min'
            })
        )
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('vendorJS', function(){
    gulp.src('js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(
            rename({
                basename: 'vendor',
                suffix: '.min'
            })
        )
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('images', function(){
    gulp.src('images/*')
        .pipe(
            cache(
                imagemin([
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 3 }), // 0-7 low-high.
                    imagemin.svgo({
                        plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
                    })
                ])
            )
        )
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('watch', function() {
    gulp.watch('css/sass/**/*.scss', ['sass']);
    gulp.watch('css/vendor/*.css', ['vendorCSS']);
    gulp.watch('js/custom/*.js', ['scripts']);
    gulp.watch('js/vendor/*.js', ['vendorJS']);
    gulp.watch('images/*', ['images']);
});

gulp.task('default', ['sass', 'vendorCSS', 'scripts', 'vendorJS', 'images', 'watch']);