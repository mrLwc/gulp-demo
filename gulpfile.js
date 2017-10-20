/*
 * @Author: iceStone
 * @Date:   2016-01-27 10:21:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-20 15:34:32
 */

'use strict';
/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

// 1. LESS编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task('style', function() {
    // 这里是在执行style任务时自动执行的
    gulp.src(['demo/styles/*.less', '!demo/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 2. JS合并 压缩 混淆
gulp.task('script', function() {
    gulp.src('demo/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 3. 图片复制
gulp.task('image', function() {
    gulp.src('demo/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

var htmlmin = require('gulp-htmlmin');
// 4. HTML
gulp.task('html', function() {
    gulp.src('demo/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 开启服务器并监听
var browserSync = require('browser-sync');
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ['dist']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('demo/styles/*.less', ['style']);
    gulp.watch('demo/scripts/*.js', ['script']);
    gulp.watch('demo/images/*.*', ['image']);
    gulp.watch('demo/*.html', ['html']);
});