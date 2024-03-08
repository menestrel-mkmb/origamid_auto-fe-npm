const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');

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

function resolveJs() {
  return gulp.src('./js/*.js')
  .pipe(concat('script.js'))
  .pipe(gulp.dest('./js/'))
} 

gulp.task('mainjs', resolveJs);

function watch(){
  gulp.watch('css/scss/**/*.scss', sassCompile);
  gulp.watch(['./js/*.js', '!./js/script.js'], resolveJs);
  gulp.watch(['./**/*.html', './**/*.php'])
  .on('change', browsersync.reload);
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