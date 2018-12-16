import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

export default function CustomHooks() {

  return (
    <div>
      <h1>自定义 Hook</h1>
      <p>自定义Hook就是为了让我们可以把组件逻辑抽出来变成可以复用的函数</p>
      <h3>我们看一个自定义Hooks的需求场景：</h3>
      <SyntaxHighlighter>
        {`
          import { useState, useEffect } from 'react';

          function FriendStatus(props) {
            // 重复代码-start
            const [isOnline, setIsOnline] = useState(null);
          
            function handleStatusChange(status) {
              setIsOnline(status.isOnline);
            }
          
            useEffect(() => {
              ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
              return () => {
                ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
              };
            });
            // 重复代码-end
          
            if (isOnline === null) {
              return 'Loading...';
            }
            return isOnline ? 'Online' : 'Offline';
          }
        `}
      </SyntaxHighlighter>
      <p>这段代码实现的逻辑是订阅一个朋友的在线状态数据，改变本组件的state：isOnline</p>
      <p>如果我们在另一个组件，有类似的需求，用颜色来显示朋友在线状态</p>
      <SyntaxHighlighter>
        {`
          import { useState, useEffect } from 'react';

          function FriendListItem(props) {
            // 重复代码-start
            const [isOnline, setIsOnline] = useState(null);
          
            function handleStatusChange(status) {
              setIsOnline(status.isOnline);
            }
          
            useEffect(() => {
              ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
              return () => {
                ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
              };
            });
            // 重复代码-end
          
            return (
              <li style={{ color: isOnline ? 'green' : 'black' }}>
                {props.friend.name}
              </li>
            );
          }
        `}
      </SyntaxHighlighter>
      <p>start～end之间都是重复代码，我们最好把这部分抽出来，变成可复用的。<br/>
        在Hooks出现前，我们有两种可以选择的方案，render props和高阶组件，而Hooks可以实现这个需求的同时，可以避免增加额外的组件。
      </p>
      <h3>抽取逻辑做成自定义Hooks</h3>
      <p>我们在写hooks之前，首先要知道我们要写的是什么，自定义hooks应该长什么样？</p>
      <p>官方定义：自定义Hook是一个名字以use开头的，可能会调用其他Hooks的js函数。</p>
      <p>本质就是js函数，ok，坐下，基本操作，这个大家都会写。为什么要以use开头？为了能让你一眼看出来它是一个Hook。</p>
      <p>我们把上面例子中的重复代码抽出来</p>
      <SyntaxHighlighter>
        {`
          import { useState, useEffect } from 'react';

          function useFriendStatus(friendID) {
            const [isOnline, setIsOnline] = useState(null);
          
            function handleStatusChange(status) {
              setIsOnline(status.isOnline);
            }
          
            useEffect(() => {
              ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
              return () => {
                ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
              };
            });
          
            return isOnline;
          }
        `}
      </SyntaxHighlighter>
      <p>是不是没有什么新玩意？我们完全从重复代码里拷贝了逻辑过来。注意：</p>
      <ul>
        <li>函数名是use开头</li>
        <li>参数是我们自定义的</li>
        <li>并在函数结尾返回了值</li>
        <li>自定义函数同样要满足Hooks基本法：no条件、循环、嵌套</li>
      </ul>
      <h3>使用这个自定义Hook</h3>
      <SyntaxHighlighter>
        {`
          function FriendStatus(props) {
            // 使用我们的自定义hook
            const isOnline = useFriendStatus(props.friend.id);
          
            if (isOnline === null) {
              return 'Loading...';
            }
            return isOnline ? 'Online' : 'Offline';
          }
        `}
      </SyntaxHighlighter>
      <SyntaxHighlighter>
        {`
          function FriendListItem(props) {
            // 使用我们的自定义hook
            const isOnline = useFriendStatus(props.friend.id);
          
            return (
              <li style={{ color: isOnline ? 'green' : 'black' }}>
                {props.friend.name}
              </li>
            );
          }
        `}
      </SyntaxHighlighter>
      <ul>
        <li>两个组件并不共享同一个state，互相是隔离的。</li>
        <li>如何实现state隔离？执行我们的自定义Hook等价于执行了useHook、useEffect，就像我们在StateHooks那节讲过的
          在同一个组件中多次调用useHook、useEffect，这些states和effects是相互独立的。</li>
      </ul>
    </div>
  );
}
