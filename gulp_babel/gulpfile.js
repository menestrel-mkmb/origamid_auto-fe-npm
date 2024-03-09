const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

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

async function pluginJs() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('./js/'))
  .pipe(browsersync.stream());
}

gulp.task('pluginsjs', pluginJs);

async function resolveJs() {
  return gulp.src('./js/*.js')
  .pipe(concat('script.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('./js/'))
  .pipe(browsersync.stream());
} 

gulp.task('mainjs', resolveJs);

async function watch(){
  sassCompile();
  resolveJs();
  pluginJs();
  gulp.watch('css/scss/**/*.scss', sassCompile);
  gulp.watch([
    './js/*.js',
    '!./js/script.js',
    '!./js/plugins.js'
  ],resolveJs);
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