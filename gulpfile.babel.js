/* eslint-disable */ 
// HTML
import htmlmin from 'gulp-htmlmin';

// CSS
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

// JavaScript
import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

// Common
import { init as server, stream, reload } from 'browser-sync';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';

const cssPlugins = [cssnano(), autoprefixer()];

gulp.task('html-min', () => {
  return gulp
    .src('./src/*.html')
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest('./docs'));
});

gulp.task('styles', () => {
  return gulp
    .src('./src/css/*.css')
    .pipe(plumber())
    .pipe(concat('styles-min.css'))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./docs/css'))
    .pipe(stream());
});

gulp.task('babel', () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./docs/js'));
});

gulp.task('imgmin', () => {
  return gulp
    .src('./src/img/*')
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 30, progressive: true }),
        imagemin.optipng({ optimizationLevel: 1 })
      ])
    )
    .pipe(gulp.dest('./docs/img'));
});

gulp.task('build', gulp.series('html-min', 'imgmin', 'styles', 'babel'));

gulp.task('default', () => {
  server({
    server: './docs'
  });
  gulp.watch('./src/*.html', gulp.series('html-min')).on('change', reload);
  gulp.watch('./src/css/*.css', gulp.series('styles')).on('change', reload);
  gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload);
});