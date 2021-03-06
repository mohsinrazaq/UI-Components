const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-cleancss');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const LessAutoprefix = require('less-plugin-autoprefix');
const BrowserSync = require('browser-sync');
const lessGlob = require('gulp-less-glob');

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

var lessDir = 'src/assets/less/';


//Tasks: Minify and compile 

gulp.task('html-minify', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('image-minify', function () {
    gulp.src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));
});


gulp.task('less', function () {
    gulp.src(lessDir + 'main.less')
        .pipe(sourcemaps.init())
        .pipe(lessGlob())
        .pipe(less())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(BrowserSync.stream());
});


//Tasks : Watch, Build and save

gulp.task('serve', function () {
    BrowserSync.init({
        server: "dist"
    });
    gulp.watch('src/*.html', ['html-minify']);
    gulp.watch('src/assets/image/*', ['image-minify']);
    gulp.watch(lessDir + '**/*.less', ['less']);
    gulp.watch('dist/*.html').on('change', BrowserSync.reload);
});


//Tasks: Default Build Trigger 

gulp.task('default', ['html-minify', 'less', 'image-minify', 'serve']);