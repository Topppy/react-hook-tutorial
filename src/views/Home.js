import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>React Hooks</h1>
      <h3>hooks为了解决什么问题？</h3>
      <p>state逻辑复用</p>
      <h3>class会完全被替代吗？</h3>
      <p>也许，但是react并不打算删除掉class。</p>

      <h3>References</h3>
      <ul>
        <li>
          <a href='https://reactjs.org/docs/hooks-intro.html'>
            React Hooks
          </a>
        </li>
        <li>
          <a href='https://medium.com/@vcarl/everything-you-need-to-know-about-react-hooks-8f680dfd4349'>
            Everything you need to know about React Hooks
          </a>
        </li>
        <li>
          <a href='https://medium.freecodecamp.org/how-to-build-a-todo-list-with-react-hooks-ebaa4e3db3b'>
          How to Build a Todo List with React Hooks
          </a>
        </li>
      </ul>
    </div>
  );
}