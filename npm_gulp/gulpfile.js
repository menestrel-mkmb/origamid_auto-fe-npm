const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

function sassCompile() {
    return gulp.src('css/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'))
}

gulp.task('sass', sassCompile);