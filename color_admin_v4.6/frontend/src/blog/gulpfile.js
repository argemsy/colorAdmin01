var gulp       = require('gulp');
var sass       = require('gulp-sass');
var minifyCSS  = require('gulp-csso');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var webserver  = require('gulp-webserver');
var header     = require('gulp-header');
var merge      = require('merge-stream');
var distPath   = '../../template';

gulp.task('fonts', function() {
  return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
  	.pipe(gulp.dest(distPath + '/assets/css/webfonts/'));
});

gulp.task('html', function(){
  return gulp.src(distPath + '/**/*.html')
    .pipe(livereload());
});

gulp.task('css', function(){
  return gulp.src([
			'node_modules/animate.css/animate.min.css',
			'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
			'node_modules/jquery-ui-dist/jquery-ui.min.css',
			'node_modules/pace-js/themes/black/pace-theme-flash.css',
  		'sass/styles.scss'
  	])
		.pipe(sass())
		.pipe(concat('app.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(distPath + '/assets/css/blog/'))
		.pipe(livereload());
});
	
gulp.task('css-theme', function(){
	var colorList = ['red','pink','orange','yellow','lime','green','teal','aqua','blue','purple','indigo','black'];
	
	var tasks = colorList.map(function (color) {
		return gulp.src([ 'sass/theme.scss' ])
			.pipe(header('$primary-color: \''+ color +'\';'))
			.pipe(sass())
			.pipe(concat(color +'.min.css'))
			.pipe(minifyCSS())
			.pipe(gulp.dest(distPath + '/assets/css/blog/theme/'));
  });
	console.log('Generating the css files. Please wait...');
  return merge(tasks);
});

gulp.task('js', function(){
  return gulp.src([
  	'node_modules/pace-js/pace.min.js',
  	'node_modules/jquery/dist/jquery.min.js',
  	'node_modules/jquery-ui-dist/jquery-ui.min.js',
  	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  	'node_modules/js-cookie/src/js.cookie.js',
  	'node_modules/paroller.js/dist/jquery.paroller.min.js',
  	'js/app.js',
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath + '/assets/js/blog/'))
    .pipe(livereload())
});

gulp.task('plugins', function() {
	var pluginFiles = [
	];
	gulp.src(pluginFiles, { base: './node_modules/' })
		.pipe(gulp.dest(distPath + '/assets/plugins'));
});

gulp.task('watch', function () {
	livereload.listen();
  gulp.watch(distPath + '/**/*.html', gulp.series(gulp.parallel(['html'])));
  gulp.watch('js/*.js', gulp.series(gulp.parallel(['js'])));
  gulp.watch('sass/**/*.scss', gulp.series(gulp.parallel(['css', 'css-theme'])));
});

gulp.task('webserver', function() {
  gulp.src(distPath)
    .pipe(webserver({
    	host: 'localhost',
      livereload: true,
      directoryListing: false,
      open: '/template_blog/',
      fallback: 'index.html'
    }));
});

gulp.task('default', gulp.series(gulp.parallel(['fonts', 'css', 'css-theme', 'js', 'webserver', 'watch'])));