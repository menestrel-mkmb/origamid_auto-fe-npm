const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

function sassCompileOld() {
    return gulp.src('css/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'))
}

gulp.task('sass-old', sassCompileOld);

async function sassCompile() {
  import('gulp-autoprefixer').then(module => {
    const autoPrefixer = module.default;
    return gulp.src('css/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoPrefixer())
  .pipe(gulp.dest('css/'))
    // Your existing code that uses autoPrefixer
  });
}

gulp.task('sass', sassCompile);

function watch(){
  gulp.watch('css/scss/**/*.scss', sassCompile);
}

gulp.task('default', watch);