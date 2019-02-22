import React, { useReducer } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
}

//Accepts a reducer of type (state, action) => newState, 
// and returns the current state paired with a dispatch method. 
// (If you’re familiar with Redux, you already know how this works.)

export default function UseReducerHook() {
  return (
    <div>
      <h1>Use Reducer Hook</h1>
      介绍：
      <ul>
        <li>userReducer这个hook使用起来跟redux很像</li>
        <li>它接收两个参数，reducer函数和初始值（简单使用）</li>
        <li>reducer函数的形式类似于
          <SyntaxHighlighter language='javascript' style={docco}>
            {`(state, action) => newState`}
          </SyntaxHighlighter>
        </li>
        <li>返回state和dispatch函数</li>
        <li>state就是数据</li>
        <li>而dispath是用来触发action的函数，可以传递给子组件，接收形式为
          <SyntaxHighlighter language='javascript' style={docco}>
          {`{ type: 'decrement'}`}
          </SyntaxHighlighter>
          的参数
        </li>
        <li>适合复杂state场景，比如state有多层级数据</li>

      </ul>
      <Counter/>
      <p>源码如下，</p>
      <SyntaxHighlighter language='javascript' style={docco}>
        {`
          import React, { useReducer } from 'react';

          // ------------start 类似于redux
          const initialState = {count: 0};

          function reducer(state, action) {
            switch (action.type) {
              case 'increment':
                return {count: state.count + 1};
              case 'decrement':
                return {count: state.count - 1};
              default:
                throw new Error();
            }
          }
          // -----------end
          
          function Counter() {
            const [state, dispatch] = useReducer(reducer, initialState);
            return (
              <div>
                Count: {state.count}
                <button onClick={() => dispatch({type: 'increment'})}>+</button>
                <button onClick={() => dispatch({type: 'decrement'})}>-</button>
              </div>
            );
          }
        `}
      </SyntaxHighlighter>
    </div>
  );
}
