import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

const defaultTitle = document.title

export default function EffectHook() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    // willUnmout callback
    return () => {
      document.title = defaultTitle
    }
  });

  return (
    <div>
      <h1>Effect Hook</h1>
      <h3>简介</h3>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>源码如下，</p>
      <SyntaxHighlighter language='javascript' style={docco}>
        {`
          import { useState, useEffect } from 'react';
          const defaultTitle = document.title

          function Example() {
            const [count, setCount] = useState(0);
          
            // Similar to componentDidMount and componentDidUpdate:
            useEffect(() => {
              // Update the document title using the browser API
              document.title = ${`You clicked $\{count} times`};
              // Similar to componentWillUnmount
              return () => {
                document.title = defaultTitle
              }
            });
          
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
        <li>EffectHook给了function组件执行带有副作用操作（称为effects）的能力，eg. 请求数据、订阅、改变DOM</li>
        <li>EffectHook与Class组件的componentDidMount, componentDidUpdate和 componentWillUnmount的使用场景是类似的</li>
        <li>EffectHook在每次render后执行，就是说，首次DidMount和更新的DidUpdate时，EffectHook都会执行</li>
        <li>组件卸载的时候也会经过EffectHook，不过执行的是不再是EffectHook本身，而是EffectHook return的fucntion。</li>
        <li>EffectHook也可以像StateHook一样在一个组件中Home多次使用</li>
      </ul>
      
      effects分为两种：
      <ul>
        <li>不需要clean up的，比如数据请求，改变DOM等，执行完就不用再管了</li>
        <li>需要clean up的，比如订阅，定时器等，需要在组件变更／销毁的时候清理一下</li>
      </ul>
      <h3>不需要清理的Effects</h3>
      几个引导性问答：
      <ul>
        <li>useEffect是干什么用的？</li>
        <p>  使用EffectHook来告诉react在render后执行一些事情，React会保存你传递给useEffect的函数，并在DOM更新之后执行</p>
        <li>为什么在组件內调用useEffect？</li>
        <p>  可以利用闭包的特性来访问state，props</p>
        <li>useEffect每次render之后都会执行么？</li>
        <p>  是的。react保证在每次DOM更新后调用useEffect</p>
      </ul>
      与componentDidMount, componentDidUpdate的一个关键性差异在于：
      <ul>
        <li>useEffect调度的effects不会阻塞浏览器更新，响应体验更好</li>
      </ul>




    </div>
  );
}
