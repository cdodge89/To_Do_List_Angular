"use strict";

var   gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  maps = require('gulp-sourcemaps'),
       del = require('del'),
      open = require('gulp-open'),
  cleanCss = require('gulp-clean-css');

  gulp.task("concatScripts", function() {
   return gulp.src([
        // 'dist/bower_components/boostrap/dist/js/boostrap.js',
        'dist/bower_components/angular/angular.js',
        'src/js/*.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist'));
});

 gulp.task("minifyScripts", ["concatScripts"], function() {
   return gulp.src("dist/app.js")
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

 gulp.task('compileSass', function() {
  return gulp.src("src/scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(rename('main.css'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist'));
});

 gulp.task('minifyCss', ['compileSass'], function(){
 	return gulp.src("dist/main.css")
    .pipe(cleanCss())
    .pipe(gulp.dest('dist'));
 });

 gulp.task('copyViews', function(){
 	return gulp.src('src/views/*.html')
 		.pipe(gulp.dest('dist/views'));
 });

 gulp.task('copyIndex', function(){
 	return gulp.src('src/index.html')
 		.pipe(gulp.dest('dist'));
 });

 // gulp.task('copyJson', function(){
 //  return gulp.src('js/*.json')
 //    .pipe(gulp.dest('dist'));
 // });

 //  gulp.task('copyImages', function(){
 //  return gulp.src('images/*.gif')
 //    .pipe(gulp.dest('dist/images'));
 // });

 gulp.task('watchFiles', function() {
  gulp.watch('src/scss/*.scss', ['compileSass']);
  gulp.watch('js/*.js', ['concatScripts']);
  gulp.watch('src/index.html', ['copyIndex']);
  gulp.watch('src/views/*.html', ['copyViews']);
});

 gulp.task('serve', ['watchFiles', 'compileSass', 'concatScripts', 'copyIndex', 'copyViews'], function(){
 	// gulp.src('dist/index.html')
 	// 	.pipe(open({app: 'chrome'}));
 });

 gulp.task('default', ['serve'], function(){
 	gulp.watch('src/scss/*.scss', ['serve']);
	gulp.watch('src/js/*.js', ['serve']);
	gulp.watch('src/index.html', ['serve']);
  gulp.watch('src/views/*.html', ['serve']);
 });

 gulp.task('deploy', ['minifyScripts', 'minifyCss', 'copyIndex']);
 //in the future, use the base option (see treehouse example) to preserve my filestructure in the dist folder
 //also, I probably want to get rid of the open a new tab thing, so that I can just refresh my localhost:3000 page
