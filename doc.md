# react + hooks 这个demo项目的创建历程

## 开始
### 创建项目

首先使用 `npx create-react-app react2018` 命令创建项目。
报错 eslint@5.6.0要求的node版本不符合

`eslint@5.6.0: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0"`，

于是我们使用nvm切换到了8.14.0（以及避免我经常遇到这些错误，我将8.14.0设置为default版本），重新执行`npx create-react-app react2018`，成功创建项目

`cd react2018`

### 升级react到可以使用hook的版本

```
yarn add react@16.7.0-alpha.2
yarn add react-dom@16.7.0-alpha.2
```

### 启动
```bash
yarn start
```

## hooks
[中文文档](https://react.docschina.org/docs/hooks-intro.html)
[英文文档](https://reactjs.org/docs/hooks-intro.html)

### hooks为了解决什么问题？
逻辑复用。

现有的react生态只允许使用HOC、[render prop](https://react.docschina.org/docs/render-props.html)等方式去增强组件们（需要额外改造来适配HOC）,并且，很麻烦。React需要一些更好的底层元素来复用stateful logic.使用Hooks，你可以在将含有state的逻辑从组件中抽象出来，这将可以让这些逻辑容易被测试。同时，Hooks可以帮助你在不重写组件结构的情况下复用这些逻辑。 这样这些逻辑就可以跨组件复用。

#### class会完全被替代吗？
也许，但是react并不打算删除掉class。

## 我决定每一个篇都写成一个路由，这样既可以看到文字，有可以看到实例代码的执行。
### router
react-router
```
yarn add react-router-dom
```

### [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

```
yarn add eslint-plugin-react-hooks@next --dev

```

改package.json中的eslintConfig

```
"eslintConfig": {
    "extends": "react-app",
    "plugins": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error"
    }
  },
```

### 部署

The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://topppy.github.io/react-hook-tutoria",

The build folder is ready to be deployed.

[参考](https://medium.com/@_mariacheline/deploy-create-react-app-project-to-github-pages-2eb6deda5b89)

在package.json中增加脚本

```
"predeploy": "npm run build",
"deploy": "gh-pages -d build" 
```
安装ph-pages
```
yarn add gh-pages --dev
```
执行命令
```
yarn deploy
```
部署后，发现项目的gh-pages没有子路径前缀，

配置Router组件
```
<Router basename="/react-hook-tutorial" >
```

### gh-pages 404 

首先我最初使用的是BrowserRouter，因此需要给<BrowserRouter basename="/react-hook-tutorial" >增加项目同名的basename才会被访问到。

之后首页可以访问到，点击跳转也ok，但是直接刷新页面，出了首页其他路由都会404，于是我将路由改为HashRouter，并去掉了basename。完美。




