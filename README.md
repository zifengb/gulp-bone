# gulp-bone
build a bone for normal development with gulp and the plugins of that


## Purpose

* 搭建基于gulp开发的环境骨架,支持以下功能

> 1. 编译`sass`<br>
> 2. 给编译后的`css`添加`prefixer`前缀<br>
>	3. `Babel`编译，把`Es6`代码编译成`Es5` <br>
>	4. 清除没有使用的`css` <br>
>	5. 压缩图片/`html`/`css`/`js` <br>
>	6. `browser-sync`监听文件修改进行热加载更新 <br>
> 7. `js`添加`jsdoc`注解(未实现)<br>


## Usage

* init - 初始化

      npm install / yarn install


* env - 开发模式

      npm run env / yarn run env

* build - 生产模式

      npm run build / yarn run build