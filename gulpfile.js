var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var lineec = require('gulp-line-ending-corrector');
var filter = require('gulp-filter');
var mmq = require('gulp-merge-media-queries');
var rename = require('gulp-rename');
var minifycss = require('gulp-uglifycss');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var remember = require('gulp-remember');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

gulp.task('vendorsCSS', function(){
    return gulp
        .src('css/vendor/*.css', { since: gulp.lastRun('vendorsCSS') }) // Only run on changed files.
        .pipe(remember('vendorsCSS')) // Bring all files back to stream
        .pipe(concat('vendors.css'))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest('assets/css/'))
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                '> 1%',
                'ie >= 9',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4',
                'bb >= 10'
            ]
        }))
        .pipe(mmq({ log: true }))
        .pipe(
            rename({
                basename: 'vendors',
                suffix: '.min'
            })
        )
        .pipe(minifycss({ maxLineLen: 10 }))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('customCSS', function(){
    return gulp
        .src('css/sass/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: true,
                outputStyle: 'compact',
                precision: 10
            })
        )
        .on('error', sass.logError)
        .pipe(sourcemaps.write({ includeContent: false }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                '> 1%',
                'ie >= 9',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4',
                'bb >= 10'
            ]
        }))
        .pipe(sourcemaps.write( './' ))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest( './' ))
        .pipe(filter( '**/*.css' )) // Filtering stream to only css files
        .pipe(mmq({ log: true })) // Merge Media Queries only for .min.css version.
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss({ maxLineLen: 10 }))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest( './' ))
        .pipe(filter( '**/*.css' ));
});

gulp.task('vendorsJS', function(){
    return gulp
        .src('js/vendor/*.js', { since: gulp.lastRun('vendorsJS') }) // Only run on changed files.
        .pipe(
            plumber({
                errorHandler: function( err ){
                    notify.onError('Error in vendorsJS: <%= error.message %>' )( err );
                    this.emit('end'); // End stream if error is found
                }
            })
        )
        .pipe(remember('vendorsJS')) // Bring all files back to stream
        .pipe(concat('vendors.js'))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest('assets/js/'))
        .pipe(
            rename({
                basename: 'vendors',
                suffix: '.min'
            })
        )
        .pipe(uglify())
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('customJS', function(){
    return gulp
        .src('js/custom/*.js', {since: gulp.lastRun('customJS')}) // Only run on changed files.
        .pipe(
            plumber({
                errorHandler: function( err ) {
                    notify.onError('Error in customJS: <%= error.message %>')(err);
                    this.emit('end'); // End stream if error is found
                }
            })
        )
        .pipe(remember('customJS')) // Bring all files back to stream
        .pipe(concat('custom.js'))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest('assets/js/'))
        .pipe(
            rename({
                basename: 'custom',
                suffix: '.min'
            })
        )
        .pipe(uglify())
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest('assets/js'));
});

gulp.task('images', function(){
    return gulp
        .src('images/*')
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

gulp.task('clearCache', function( done ){
    return cache.clearAll( done );
});

gulp.task(
    'default',
    gulp.parallel(
        'vendorsCSS',
        'customCSS',
        'vendorsJS',
        'customJS',
        'images',
        function watchFiles(){
            gulp.watch('css/vendor/*.css', gulp.series('vendorsCSS')); // Reload on SCSS file changes.
            gulp.watch('css/sass/**/*.scss', gulp.series('customCSS')); // Reload on SCSS file changes.
            gulp.watch('js/vendor/*.js', gulp.series('vendorsJS')); // Reload on vendorsJS file changes.
            gulp.watch('js/custom/*.js', gulp.series('customJS')); // Reload on customJS file changes.
            gulp.watch('images/*', gulp.series( 'images')); // Reload on customJS file changes.
            console.log('Compilation is done!');
        }
    )
);