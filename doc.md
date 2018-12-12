# react + hooks + serviceWorker
## 开始
### 创建项目

首先使用 `npx create-react-app react2018` 命令创建项目。
报错 eslint@5.6.0要求的node版本不符合

`eslint@5.6.0: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0"`，

于是我们使用nvm切换到了8.14.0（以及避免我经常遇到这些错误，我将8.14.0设置为default版本），重新执行`npx create-react-app react2018`，成功创建项目

`cd react2018`

### 升级react

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





