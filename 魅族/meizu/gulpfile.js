const gulp = require("gulp")
const rename = require("gulp-rename")
const minifycss = require("gulp-minify-css")
const htmlmin = require("gulp-htmlmin")
const sass = require("gulp-sass")
sass.compiler = require('node-sass')
const connect = require("gulp-connect")

gulp.task('copy-html',function(){
    return gulp.src('./*.html')
    .pipe(htmlmin({
        removeEmptyAttibutes: true,
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
})

gulp.task('copy-css',function(){
    return gulp.src('./index.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})


gulp.task('copy-css2',function(){
    return gulp.src('./details.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('details.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('copy-css3',function(){
    return gulp.src('./login.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('login.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('copy-css4',function(){
    return gulp.src('./registered.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('registered.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('copy-css5',function(){
    return gulp.src('./settlement.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('settlement.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('copy-css6',function(){
    return gulp.src('./goodslist.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('goodslist.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('copy-css7',function(){
    return gulp.src('./cart.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(rename('cartmain.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('copy-js',function(){
    return gulp.src(['./*.js','!gulpfile.js'])
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
})

gulp.task('copy-img',function(){
    return gulp.src('./img/*.{jpg,png}')
    .pipe(gulp.dest('dist/img/'))
    .pipe(connect.reload());
})


gulp.task('copy-json',function(){
    return gulp.src(['./*.json','!package.json'])
    .pipe(gulp.dest('dist/json/'))
    .pipe(connect.reload());
})

gulp.task('build',['copy-html','copy-css','copy-js','copy-json','copy-img','copy-css2','copy-css3','copy-css4','copy-css5','copy-css6','copy-css7'])

gulp.task('watch',function(){
    gulp.watch('./*.html',['copy-html']);
    gulp.watch('./index.scss',['copy-css']);
    gulp.watch('./login.scss',['copy-css3']);
    gulp.watch('./registered.scss',['copy-css4']);
    gulp.watch('./settlement.scss',['copy-css5']);
    gulp.watch('./goodslist.scss',['copy-css6']);
    gulp.watch('./cart.scss',['copy-css7']);
    gulp.watch('./details.scss',['copy-css2']);
    gulp.watch('./*.js',['copy-js']);
    gulp.watch(['./*.json','!package,json'],['copy-json']);
    gulp.watch('./img/*.{jpg,png}',['copy-img']);
})

gulp.task('server',function(){
    connect.server({
        root:"dist",
        port:"8887",
        livereload:true
    })
})

gulp.task('default',['watch','server'])