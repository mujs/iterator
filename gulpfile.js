var gulp   = require('gulp'),
    concat = require('gulp-concat-sourcemap'),
    eslint = require('gulp-eslint')
    del    = require('del');

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('lint', ['clean'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('dependencies', ['lint'], function () {
  var dependencies = [
    'dependencies/module/src/module.js'
  ];

  return gulp.src(dependencies)
    .pipe(concat('dependencies.js', { sourcesContent: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['lint'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(concat('scripts.js', { sourcesContent: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', ['lint'], function () {
  return gulp.src('./src/styles.css')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('index', ['lint'], function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['dependencies', 'scripts', 'styles', 'index']);
