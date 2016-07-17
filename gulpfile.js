var gulp = require('gulp'),
	del  = require('del'),
	browserSync = require('browser-sync').create(),
	stream = browserSync.stream,
	less = require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	concat =require('gulp-concat'),
	webpack = require('webpack-stream');




var config = {
	paths:{
		css:['./src/**/*.css'],
		less:['./src/**/*.less'],
		js:['./src/**/*.js'],
		html:'./src/**/*.html',
		app:'./src/app.js',
		images:'./src/images/**/*.*'

	},
	dest:{
		style:'style.css',
		app:'app.js',
		dist:'dist/',
		less:'src/',
		images:'dist/images'

	}

};
gulp
	.task('clean',()=>{
		console.log('cleaning dist directory...')
		del([config.dest.dist]).then((paths) => {console.log('Deleted files and folders:\n',paths.join('\n'));})
	})
	
	.task('server',()=>{
		browserSync.init({server:{ baseDir:'dist/' } } );
		
	})

	.task('html',()=>{
		console.log("copying html files...");
		return gulp.src(config.paths.html)
			.pipe(gulp.dest(config.dest.dist))
			.pipe(stream());
	})

	.task('images',()=>{
		console.log("copying image files...");
		return gulp.src(config.paths.images)
		.pipe(gulp.dest(config.dest.dist))
		.pipe(stream());

	})

	.task('less',()=>{
		console.log('copying less files...');
		return gulp.src(config.paths.less)
			.pipe(less())
			.pipe(gulp.dest(config.dest.less))
			.pipe(stream());

	})

	.task('css',['less'],()=>{
		console.log('merging css files...');
		return gulp.src(config.paths.css)
			.pipe(concat(config.dest.style))
			.pipe(gulp.dest(config.dest.dist))
			.pipe(stream());
	})

	.task('css:min',['less'],()=>{
		console.log('merging css files...');
		return gulp.src(config.paths.css)
			.pipe(concat(config.dest.style))
			.pipe(cssmin())
			.pipe(gulp.dest(config.dest.dist))
			.pipe(stream());
	})
	.task('js',()=>{
		console.log('processing js files...');
		return gulp.src(config.paths.js)
			.pipe(webpack(require('./webpack.config.js')))
			.pipe(gulp.dest(config.dest.dist))
			.pipe(stream());

	})

	.task('js:min', function () {
		console.log('processing js files and minifying...')
	    return gulp.src(config.paths.js)
	      .pipe(webpack(require('./webpack.config.min.js')))
	      .pipe(gulp.dest(config.dest.dist))
	      .pipe(stream());
  })

	.task('watch',()=>{
		return gulp.watch(
			[config.paths.html,config.paths.js,config.paths.css,config.paths.images,config.paths.less],
			['html','images','css:min','js',browserSync.reload]
		);
	})
	  /**
   * Compiling resources and serving application
   */
  .task('dev-server', ['html', 'images', 'css:min', 'js:min', 'server', 'watch'])
  .task('bundle', ['clean','html', 'images', 'css', 'js'])
  .task('bundle:min', ['html', 'images', 'css:min', 'js:min'])

  .task('default', ['dev-server']);
