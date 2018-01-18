// 'use strict';
// import gulp from 'gulp';
import gulp from 'gulp';
const path = require('path');
const pump = require('pump'); // pump is a small node module that pipes streams together and destroys all of them if one of them closes.

const webserver = require('gulp-webserver'); // running like server
const livereload = require('gulp-livereload');

// minify js, css, html
const uglify = require('gulp-uglify'); // minify js files
const uglifycss = require('gulp-uglifycss'); // minify css files

const htmlmin = require('gulp-htmlmin'); // minify html
const imagemin = require('gulp-imagemin'); // minify image
const concat = require('gulp-concat'); // build js, css files to each 1 of js, css file

// build css preprocessors
const less = require('gulp-less') // build less
const sass = require('gulp-sass'); // build sass

// change name of files
const rename = require('gulp-rename');

// convert .ts to .js
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// src:files I wrote, dist:files being built by gulp
const src = 'src';
const server = 'server';
const dist = 'dist';

// path for each type of files, which you want to build
const paths = {
  html: src + '/*.html',
	// js: src + '/js/*.js',
  ts: src + '/server/**/*.ts'
  // css: src + '/css/*.css',
	// scss: src + '/scss/*.scss',
  // less: src + '/less/*.less',
  // image: src + '/uploads/images/*'
};


// typescript
gulp.task('ts', function () {
  var tsResult = gulp.src(paths.ts) // or tsProject.src()
      .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest(dist + '/server'));
});

// combine js and compress
// gulp.task('compress-js', function (cb) {
//   pump([
//       gulp.src(paths.js),
//       concat('bundle.js'),      //bundle js files
//       // gulp.dest('app/src/js/'),
//       uglify(),                 //minify bundle.js
//       rename({                  //renames the concatenated js file
//         basename : 'project',   //the base name of the renamed js file
//         extname : '.min.js'     //the extension fo the renamed js file
//       }),
//       gulp.dest(dist + '/js')   //save project.min.js at app/dist/js
//     ],
//     cb
//   );
// });

// 1. convert less, sass to css
// 2. combine css to bundle.css
// 3. uglify bundle.css to ~.min.css

// compile sass to css files
// gulp.task('compile-sass', function (cb) {
//   pump([
//       gulp.src(paths.scss),
//       sass({
//         errLogToConsole:true
//       }),
//       gulp.dest(src + '/css')
//     ],
//     cb
//   );
// });

// compile less to css files
// gulp.task('compile-less', (cb) => {
//   pump([
//       gulp.src(paths.less),
//       less(),
//       gulp.dest(src + '/css')
//     ],
//     cb
//   );
// });

// combine css files to project.css and minify, then rename project.min.css
// gulp.task('compress-css', function (cb) {
//   pump([
//       gulp.src(paths.css),
//       concat('bundle.css'),
//       // gulp.dest(src + "/css"),
//       uglifycss(),
//       rename({
//         basename:'project',
//         extname:'.min.css'
//       }),
//       gulp.dest(dist + '/css')
//     ],
//     cb
//   );
// });

// minify html files
gulp.task('minifyHtml', function (cb) {
  pump([
      gulp.src(paths.html),
      htmlmin({ collapseWhitespace: true }),
      gulp.dest(dist + '/')
    ],
    cb
  );
});

//minify images
// gulp.task('minifyImg', () => {
//     return gulp.src(paths.image)
//            .pipe(imagemin())
//            .pipe(gulp.dest(dist + "/images"));
// });

// delete dist folder
// const del  = require('del');
// gulp.task('clean', () => {
//     return del.sync([dist]);
// });


// watch file change and reload server
gulp.task('watch', function () {
	livereload.listen();
  gulp.watch(paths.ts, ['ts']);
	// gulp.watch(paths.js, ['compress-js']);
	// gulp.watch(paths.scss, ['compile-sass', 'compress-css']);
	// gulp.watch(paths.less, ['compile-less', 'compress-css']);
	// gulp.watch(paths.image, ['minifyImg']);
	gulp.watch(paths.html, ['minifyHtml']);
	// gulp.watch(dist + '/**').on('change', livereload.changed);
});

// nodemon later~~~~
const nodemon = require('gulp-nodemon');
gulp.task('server', function () {
  var stream = nodemon({
    script: './dist/server/server.js',
    ext: 'html js',
    ignore: ['ignored.js'],
    // tasks: ['tslint']
  });

  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
        stream.emit('restart', 10)  // restart the server in 10 seconds
      });
});

//기본 task 설정
gulp.task('default', [
    // 'clean',
    'ts',
    'minifyHtml',
    // 'minifyImg',
  	// 'compile-sass',
  	// 'compile-less',
    // 'compress-js',
    // 'compress-css',
    'watch',
    'server'
  ]
);
