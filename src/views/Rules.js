import React from 'react';

export default function Rules() {
  return (
    <div>
      <h1>Hooks规则：</h1>
      <ul>
        <li>只能在顶级调用Hooks。不能在循环，条件判断，嵌套函数中调用Hooks</li>
        <li>只能在React function组件中调用Hooks。不能在普通的js函数中调用Hooks</li>
      </ul>
      官方提供<a href='https://www.npmjs.com/package/eslint-plugin-react-hooks'>linter</a>来校验这些规则

      <h3>使用：</h3>
      <ul>
        <li>import useState</li>
        <li>获取当前state： count，和stateUpdater： setCount，（解构赋值）</li>
        <li>在jsx中直接使用' count '</li>
        <li>在click handler中直接使用setCount</li>
      </ul>
    </div>
  );
}