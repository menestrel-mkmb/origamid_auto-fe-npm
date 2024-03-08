const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

// function sassCompile() {
//     return gulp.src('css/scss/**/*.scss')
//     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//     .pipe(gulp.dest('css/'))
// }

// gulp.task('sass', sassCompile);

gulp.task('sass', async function() {
    import('gulp-autoprefixer').then(module => {
      const autoPrefixer = module.default;
      return gulp.src('css/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('css/'))
      // Your existing code that uses autoPrefixer
    });
  
    // Other code related to the 'sass' task
  });