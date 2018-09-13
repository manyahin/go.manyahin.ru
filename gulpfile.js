const jsFiles = [
  './node_modules/jquery/dist/jquery.js',
  './node_modules/kbw-countdown/dist/js/jquery.plugin.js',
  './node_modules/kbw-countdown/dist/js/jquery.countdown.js',
  './src/script.js'
]

const cssFiles = [
  './node_modules/normalize.css/normalize.css',
  './src/style.css'
]

const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const pump = require('pump')
const babel = require('gulp-babel')

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ["public/**"]
    });
});

gulp.task('scripts', (cb) => {
  pump([
      gulp.src(jsFiles),
      concat('bundle.js'),
      babel({presets: ['env']}),
      uglify(),
      gulp.dest('./public/build')
    ],
    cb
  )
})

gulp.task('styles', () => {
  return gulp.src(cssFiles)
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/build'))
})

gulp.task('build', ['scripts', 'styles'])

gulp.task('default', ['build'])

// Gulpfile.js are not watching
gulp.task('watch', ['build'], () => {
  gulp.watch(jsFiles, ['scripts']);
  gulp.watch(cssFiles, ['styles']);  
})
