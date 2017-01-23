var gulp = require('gulp');

// templates
// var htmlmin = require('gulp-htmlmin');

// gulp.task('templates', function(){
// 	gulp.src('./dev/*.html')
// 		.pipe(htmlmin({
// 			collapseWhitespace: true
// 		}))
// 		.pipe(gulp.dest('./site'))
// 		.pipe(connect.reload());
// });


var pug = require('gulp-pug');
 
gulp.task('templates', function() {
	gulp.src('./dev/pug/*.pug')
		.pipe(pug({
pretty: true
}))
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});


// styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', function(){
	gulp.src('./dev/scss/style.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(prefix('last 12 version'))
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});

// scripts
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
gulp.task('scripts', function(){
	gulp.src('./dev/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});

// images
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
	gulp.src('./dev/images/*.png')
		.pipe(imagemin())
		.pipe(gulp.dest('./site/images'))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	gulp.watch('./dev/pug/**/*.pug', ['templates']);
	gulp.watch('./dev/scss/*.scss', ['styles']);
	gulp.watch('./dev/js/*.js', ['scripts']);
	gulp.watch('images/*.{jpg, png, gif, svg}', {cwd: './dev/'}, ['images']);
});

// connect
var connect = require('gulp-connect-multi')();
gulp.task('connect', connect.server({
	host: '127.0.0.1',
	port: 4848,
	root: ['site'],
	livereload: true,
}));

gulp.task('dev', ['templates', 'styles', 'scripts', 'images']);
gulp.task('default', ['dev', 'connect', 'watch']);
