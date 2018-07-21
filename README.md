Koa-Mock
===

## 特性

mockjs可以在浏览器中拦截ajax请求，现在，你也可以在koa中拦截对应的url并返回模板数据。

甚至，你可以在前端和后台环境中共用一套mock模板。

使用mock模板的好处

## 可以通过很方便地关闭mock环境，不会对逻辑代码产生侵入，也不用删除mock代码

比下面这种侵入到逻辑代码的方式要好得多
```js
let apiModel = {
    submit(){
        return Mock.mock({
            // mock数据
        })
    }
}
```

## mock模板可以当做接口文档保留在版本仓库中

接口文档可能会更新不及时，而mock模板应用在最新的开发环境中，相对于文档而言，mock的字段模板对开发人员更加友好，因此与其把mock代码散落在控制器和接口中，不如把mock模板整合在一起，作为接口文档进行管理

## 使用
```
npm i @shymean/koa-mock -D
```

### 准备mock模板
参考[mockjs官方文档](https://github.com/nuysoft/Mock/wiki/Mock.mock())，基本一致的语法
```js
let Mock = require("mockjs");

// 对应的rurl会被中间件拦截，并返回mock数据
Mock.mock('/', {
    data: [],
    msg: "hello mock",
    "code|1-4": 1,
})

// 可以mock指定的请求方法
Mock.mock('/test', 'POST', {
    data: [],
    msg: "hello mock",
    "code|1-4": 1,
})
```

### 引入中间件
在koa中引入中间件和mock模板
```js
const Koa = require("koa");
const app = new Koa();

const mock = require('koa-mock')
// 加载模板文件
require("./mock/_mock.js");  
app.use(mock())
```
此时访问对应的模板url，就会自动返回对应的mock数据，跟浏览器中自动拦截rurl对应的请求类似。

### 在浏览器中使用
由于没有对mock模板进行注入，因此即使是在浏览器环境中使用同一套模板也是十分方便的

```html
<script src="https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js"></script>
<!-- 这里将mock模板进行打包，直接引入到页面接口 -->
<script src='/mock.bundle.js'></script>
```
