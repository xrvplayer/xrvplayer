const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const buildCSS = () => {
  console.log(111)
  return gulp.src('./src/assets/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
}

exports.default = gulp.series(buildCSS)
