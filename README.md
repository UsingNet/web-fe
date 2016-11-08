## 新的第三方库

* [redux](https://github.com/reactjs/redux)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [redux-actions](https://github.com/acdlite/redux-actions)
* [css-modules](https://github.com/css-modules/css-modules)
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
* [js-cookie](https://github.com/js-cookie/js-cookie)


### Redux

状态容器，作为整个应用的唯一数据来源，数据操作的地方


### redux-saga

处理有副作用操作的 redux 中间件


### redux-actions

方便的处理和创建 redux action


### css-modules

将所有的 className 做 scope 限制，避免命名冲突


### isomorphic-fetch

替代 reqwest，前后端使用同一套 API


### js-cookie

替代 react-cookie, 用法基本一致


## 目录结构

```
.
├── /dist/                       # 构建输出的文件会在这里
├── /node_modules/               # 第三方类库和工具
├── /src/                        # 应用源码
| |—— /actions                   # 创建 actions
│ ├── /components/               # React components
| |—— /containers/               # React Containers(即有数据或 action 关联的 components)
│ ├── /entries/                  # 应用入口
│ ├── /modules/                  # 通用组件
│ ├── /reducers/                 # reducers
│ ├── /sagas/                    # redux-sagas
│ |── /selectors                 # 共用的 selector
│ |── /services/                 # 处理和服务器的交互
| |—— /styles                    # 通用样式
| |—— routes.js                  # 路由信息
├── proxy.config.js              # 配置 dora-plugin-proxy，用于 mock 和在线调试
├── webpack.config.js            # 扩展 webpack 配置
|—— webpack.production.config.js # 生产环境 webpack 配置
└── package.json                 # 配置入口文件、依赖和 scripts
```

## Redux 简介

http://alayii.github.io/react/redux/2015/07/11/redux-intro/

## redux-saga 简介

http://alayii.github.io/react/redux/2015/07/18/redux-saga/

## Reselect

http://alayii.github.io/react/redux/2015/07/18/reselect-intro/


## 实践
js 文件不应包括 jsx 语法， jsx 文件只写 jsx 及其逻辑，connect 处理应放到单独的 index.js 文件中，
dump component 不需要 connect 时， index.js 只 import 组件，再 export。

form 需使用 mapPropsToFields/onFieldsChange 两个函数实现数据绑定，后者不为必须。 onFieldsChange 主要是
用来更新 redux state tree，具体参照 SiteForm.jsx 和 AgentAssign.jsx

有时候应使用 component 的 state 来管理一些内部状态，比如一些 modal 的可见状态，而不是用 redux 管理，没有必要。

Ubuntu Chromium 有时出现点击上传文件的 input （比如网站设置的 logo 上传），文件选择出现非常慢，参考 http://stackoverflow.com/questions/39187857/inputfile-accept-image-open-dialog-so-slow-with-chrome
添加 name 应该无效，参考 https://bugs.chromium.org/p/chromium/issues/detail?id=105181，应该是浏览器 bug

