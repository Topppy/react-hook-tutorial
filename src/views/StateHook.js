import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';


export default function Counter() {
  // Declare a new state variable, which we'll call "count"
  /**
   * useState returns a pair: the current state value and a function that lets you update it.
   * userState 返回两个值，一个是当前的state值，另一个是更新state的func
   */
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>State Hook</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>源码如下，</p>
      <SyntaxHighlighter language='javascript' style={docco}>
        {`
          import { useState } from 'react';

          function Example() {
            // Declare a new state variable, which we'll call "count"
            const [count, setCount] = useState(0);

            return (
              <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                  Click me
                </button>
              </div>
            );
          }
        `}
      </SyntaxHighlighter>
      介绍：
      <ul>
        <li>useState 返回两个值，一个是当前的state值，另一个是更新state的func</li>
        <li>这个更新state的func与this.setState类似，除了它并不merge旧的state</li>
        <li>useState只接受一个参数，就是初始state，注意到与this.state不同，这个state可以不是对象（也可以是对象）</li>
        <li>如果多次调用useState，每次render都会按照你写的seState顺序执行</li>
        <li>Hooks无法在class组件中使用，只能在function组件中使用</li>
        <li>Hooks支持自定义</li>
      </ul>
      使用：
      <ul>
        <li>import useState</li>
        <li>获取当前state： count，和stateUpdater： setCount，（解构赋值）</li>
        <li>在jsx中直接使用' count '</li>
        <li>在click handler中直接使用setCount</li>
      </ul>
    </div>
  );
}