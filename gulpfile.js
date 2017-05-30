/**
 * 搭建一个基于前端常用的gulp骨架，具有以下常用功能：
 * 		1.编译sass
 * 		2.给编译后的css添加prefixer前缀
 * 		3.Babel编译，把Es6代码编译成Es5
 * 		4.压缩图片/html/css/js
 * 		5.browser-sync监听文件修改进行热加载更新
 * 		6.js添加jsdoc注解(保留的后期功能)
 */

const gulp = require("gulp");
// const del = require("del");
// const exec = require("child_process").exec;
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
// 压缩js插件
const pump = require("pump")
const uglify = require("gulp-uglify");
// 压缩css插件
const cleanCss = require("gulp-clean-css");
// 压缩图片插件
const imagemin = require("gulp-imagemin");
// 压缩html插件
const htmlmin = require("gulp-htmlmin");
// jsdoc
// const jsdoc = require("gulp-jsodc3")

const browserSync = require("browser-sync").create();

// 配置资源路径
const resourceSrc = {
  js:{
    allSrcJs:"src/js/*.js",
    libDir:"dist/js"
  },
  css:{
    allSrcCss:"src/sass/*.scss",
    libDir:"dist/css"
  },
  image:{
    allSrcImg:"src/images/*.(jpe?g|png|gif|svgo?)",
    libDir:"dist/images"
  },
  html:{
    allSrcHtml:"src/**/*.html",
    libDir:"dist"
  }
};

// babel
gulp.task('compileEs6', function(cb) {
  // return gulp.src(resourceSrc.js.allSrcJs)
  //             .pipe(babel())
  //             .pipe(gulp.dest(resourceSrc.js.libDir));
  pump([
    gulp.src(resourceSrc.js.allSrcJs),
    babel(),
    uglify(),
    gulp.dest(resourceSrc.js.libDir)
  ],cb);
});

// sass
gulp.task('compileSass', function() {
  return gulp.src(resourceSrc.css.allSrcCss)
              .pipe(sass().on('error',sass.logError))
              .pipe(autoprefixer({
                browsers:["last 2 version"],
                cascade:false
              }))
              .pipe(cleanCss({
                compatibility: "ie8"
              }))
              .pipe(gulp.dest(resourceSrc.css.libDir))
});

// image
gulp.task('imagemin', function() {
    gulp.src(resourceSrc.image.allSrcImg)
        .pipe(imagemin())
        .pipe(gulp.dest(resourceSrc.image.libDir))
});

// html
gulp.task('moveHtml', function() {
  return gulp.src(resourceSrc.html.allSrcHtml)
    .pipe(gulp.dest(resourceSrc.html.libDir))
});
gulp.task('htmlmin', function() {
    return gulp.src(resourceSrc.html.allSrcHtml)
                .pipe(htmlmin({
                  collapseWhitespace: true
                }))
                .pipe(gulp.dest(resourceSrc.html.libDir))
});

// browser-sync
gulp.task('server', ['env'], function() {
    browserSync.init({
      server:{
        baseDir:"./",
        index:"/dist/demo.html"
      },
      watchOptions:{
        ignoreInitial:true,
        ignored:["*.log","*.lock","node_modules/**/*.*"]
      },
      files:["./dist/**/*.*"],
      port:8080
    }, () => {
      console.log("the bowser was refreshed!");
    })
});

// 默认任务
// gulp.task('default', ["compileEs6","compileSass","htmlmin"]);

// 开发模式
gulp.task('env-watch', function() {
  gulp.watch('./src/**/*.*', ['moveHtml','compileEs6','compileSass']);
});

gulp.task('env', ['env-watch']);


// 生产模式

gulp.task('build', ['htmlmin','compileEs6','compileSass','imagemin']);