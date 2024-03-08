const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browsersync = require('browser-sync').create();

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
  .pipe(browsersync.stream());
  });
}

gulp.task('sass', sassCompile);

function watch(){
  gulp.watch('css/scss/**/*.scss', sassCompile);
  gulp.watch('./**/*.html').on('change', browsersync.reload);
  gulp.watch('./**/*.js').on('change', browsersync.reload);
}

gulp.task('watch', watch);

function browser() {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
}

gulp.task('liveserver', browser);

gulp.task('default', gulp.parallel('watch', 'liveserver'));