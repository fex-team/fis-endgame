fis-endgame
====

基于FIS的EndGame解决方案

## 目录

* [安装](#安装)
* [快速上手](#快速上手)
* [性能优化](#性能优化)
* [注意事项](#注意事项)
* [更多资料](#更多资料)

## 安装

* 安装 [nodejs&npm](http://nodejs.org/)
* 安装 endgame

   ```bash
    npm install fis-endgame -g
    eg -v
   ```

## 快速上手

1. 使用eg构建EndGame项目

    ```bash
    cd endgame #进入EndGame项目
    eg release
    ```
    
    查看更多使用方法
    
    ```bash
    eg release -h
    ```

1. 本地预览EndGame项目

    ```bash
    eg server start
    ```
    
    eg server提供PHP服务器与Node.js服务器。PHP服务器性能更好，但是需要安装JAVA与PHP-CGI，不愿意安装的同学可以强制使用Node.js服务器
    
    ```bash
    eg server start --type node
    ```
    
    浏览调试服务器中发布的内容
    
    ```bash
    eg server open
    ```
    
    清空eg构建内容
    
    ```bash
    eg server clean
    ```
    
    使用完毕后，可以关闭调试服务器
    
    ```bash
    eg server stop
    ```
    
    查看更多使用方法
    
    ```bash
    eg server -h
    ```

1. 增量构建
    
    由于EndGame项目必须先进行构建才可以浏览，但是每次执行eg release会比较麻烦，因此eg提供文件监听与自动刷新功能

    文件监听功能使文件修改后自动进行增量编译并发布至调试服务器
    ```bash
    eg server release -w #开启监听
    ```
    
    自动刷新功能使增量编译后，浏览器页面可以自动刷新
    ```bash
    eg server release -wL #开启自动刷新
    ```

## 性能优化

### 资源压缩

```bash
eg release -o
```

### MD5戳

```bash
eg release -m
```

### 打包合并

```bash
eg release -p
```

### 组合使用

eg的优化参数都是可以任意组合的，比如希望以上三种优化同时执行，可以使用

```bash
eg release -omp #顺序无关
```

## 注意事项

使用FIS后，要求所有项目静态资源的引用路径 **必须** 使用相对路径或相对于项目根目录的绝对路径，不可使用线上路径 (外部资源除外)

举例来说

script标签与link标签

```html
<!--wrong-->
<link rel="stylesheet" href="http://end.baidu.com/css/style.css">
<script src="http://end.baidu.com/js/eg.js" charset="UTF-8"></script>

<!--right-->
<link rel="stylesheet" href="./css/style.css">
<script src="./js/eg.js" charset="UTF-8"></script>
```

css引用图片

```css
/** wrong **/
#browserBanner {
    display:none;
    position:fixed;
    z-index:20;
    left:0;
    bottom:0;
    width:100%;
    height:50px;
    background:url(http://end.baidu.com/assets/browser.jpg) no-repeat;
    background-size:cover;
}

/** right **/
#browserBanner {
    display:none;
    position:fixed;
    z-index:20;
    left:0;
    bottom:0;
    width:100%;
    height:50px;
    background:url(./assets/browser.jpg) no-repeat;
    background-size:cover;
}
```

IMG标签引用图片

```html
<!--wrong-->
<img src="http://end.baidu.com/assets/banner.jpg" style="width:100%">

<!--right-->
<img src="./assets/banner.jpg" style="width:100%">
```

避免内联样式中引用静态资源

```html
<!--wrong-->
<div style="background:url(./assets/browser.jpg) no-repeat"></div>

<!--right-->
#browserBanner {
    background:url(./assets/browser.jpg) no-repeat;
}

<div id="browserBanner"></div>
```

Javascript中引用资源

**必须使用__uri包裹资源路径**

```javascript
//wrong
var objects = [
    {
        'icon'  :   "/games/tiger/logo.png",
        'src'   :   "/games/tiger/index.html?from=list",
    }
]

//right
var objects = [
    {
        'icon'  :   __uri("../games/tiger/logo.png"),  //__uri包裹后可以不考虑脚本执行路径，按照源码文件的相对路径编写
        'src'   :   __uri("/games/tiger/index.html?from=list"),
    }
]
```

以上针对路径的处理，将本项目的路径统一使用相对路径或绝对路径管理起来，只有使用**能够找到实体文件**的路径，FIS才能管理资源路径，为资源添加MD5戳以及添加Domain等操作

## 更多资料

[fis配置](http://fis.baidu.com/docs/api/fis-conf.html)
[roadmap详解](http://fis.baidu.com/docs/advance/roadmap.html)
[FAQ](https://github.com/fex-team/fis/labels/faq)
