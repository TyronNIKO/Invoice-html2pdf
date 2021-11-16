var gulp = require('gulp'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create(),
    browserify2 = require('browserify'),
    buffer = require('vinyl-buffer');

gulp.task('common-js', function () {
    return browserify2([
            "assets/js/index.js"
        ], {
            debug: true
        })
        .transform(babelify.configure({
            presets: ["@babel/preset-env"]
        }))
        .bundle()
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('script.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('js/'))
});

gulp.task('watch', function () {
    browserSync.init({
        proxy: "Invoice.local"
    });
    gulp.watch('assets/js/**/*.js', gulp.series('common-js'));
})

gulp.task('build-dist', function (done) {
    done();
});

gulp.task('build', gulp.series('build-dist', 'common-js'));

// gulp.task('default', gulp.series(
//     gulp.parallel('sass', 'common-js'),
//     'watch'
// ));