import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

const defaultTitle = document.title

export default function EffectHook() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      document.title = defaultTitle
    }
  });

  return (
    <div>
      <h1>Effect Hook</h1>
      <h3>简单例子</h3>
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
              // Specify how to clean up after this effect:
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
        <li>需要clean up的，比如订阅，定时器等，需要在组件变更／销毁的时候清理一下，避免内存泄漏</li>
      </ul>
      <h3>不需要清理的Effects</h3>
      几个引导性问答：
      <ul>
        <li>useEffect是干什么用的？</li>
        <p>使用EffectHook来告诉react在render后执行一些事情，React会保存你传递给useEffect的函数，并在DOM更新之后执行</p>
        <li>为什么在组件內调用useEffect？</li>
        <p>可以利用闭包的特性来访问state，props</p>
        <li>useEffect每次render之后都会执行么？</li>
        <p>是的。react保证在每次DOM更新后调用useEffect</p>
      </ul>
      与componentDidMount, componentDidUpdate的一个关键性差异在于：
      <ul>
        <li>useEffect调度的effects不会阻塞浏览器更新，会延迟到浏览器绘制完后执行，响应体验更好</li>
      </ul>
      <h3>需要清理的Effects</h3>
      几个引导性问答
      <ul>
        <li>为什么effect要return一个function？</li>
        <p>这是effects的可选清理机制，每个effect都可以return一个fucntion用来清理自己</p>
        <li>什么时候React会清理effect的？</li>
        <p>组件卸载的时候，react会执行清理。</p>
        <p>然而，上文中提到，react会在每次render的时候都执行effects，而不是只执行一次。</p>
        <p>因此实际上，react在执行下次effects前也会清理掉上次的effects</p>
      </ul>
      <h3>其他</h3>
      <h4>useEffect与class相比的优势</h4>
      <ul>
        <li>useEffect将原本分散在componentDidMount, componentDidUpdate和 componentWillUnmount三个周期內的相关逻辑集中到了一起</li>
        <li>useEffect将原本混和在同一个周期里的多个互不相关的逻辑，通过多个effects区分开来</li>
      </ul>
      <h4>为什么每次更新都要执行effects</h4>
      <ul>
        <li>一个class的例子</li>
        <SyntaxHighlighter language='javascript' style={docco}>
          {`
            class FriendStatusWithCounter extends React.Component {
              constructor(props) {
                super(props);
                this.state = { isOnline: null };
                this.handleStatusChange = this.handleStatusChange.bind(this);
              }
            
              componentDidMount() {
                ChatAPI.subscribeToFriendStatus(
                  this.props.friend.id,
                  this.handleStatusChange
                );
              }
              // 当props的friend.id改变的时候,如果我们不做额外处理（下述代码）
              // 就会出现依旧订阅的是旧数据的bug
              componentDidUpdate(prevProps) {
                // 需要取消订阅旧id
                ChatAPI.unsubscribeFromFriendStatus(
                  prevProps.friend.id,
                  this.handleStatusChange
                );
                // 重新订阅新id
                ChatAPI.subscribeToFriendStatus(
                  this.props.friend.id,
                  this.handleStatusChange
                );
              }
            
              componentWillUnmount() {
                ChatAPI.unsubscribeFromFriendStatus(
                  this.props.friend.id,
                  this.handleStatusChange
                );
              }
            
              handleStatusChange(status) {
                this.setState({
                  isOnline: status.isOnline
                });
              }
              // ...
          `}
        </SyntaxHighlighter>
        <li>如果使用hooks来实现这个需求</li>
        <SyntaxHighlighter language='javascript' style={docco}>
          {`
          function FriendStatusWithCounter(props) {
            const [isOnline, setIsOnline] = useState(null);
            useEffect(() => {
              ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
              return () => {
                ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
              };
            });
          
            function handleStatusChange(status) {
              setIsOnline(status.isOnline);
            }
            // ...
          }
          `}
        </SyntaxHighlighter>
        <li>react通过每次都render都执行effects帮我们解决了这个问题，它实际调用如下：</li>
        <SyntaxHighlighter language='javascript' style={docco}>
          {`
            // Mount with { friend: { id: 100 } } props
            ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect
            
            // Update with { friend: { id: 200 } } props
            ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
            ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect
            
            // Update with { friend: { id: 300 } } props
            ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
            ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect
            
            // Unmount
            ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
          `}
        </SyntaxHighlighter>
      </ul>
      <h4>优化</h4>
      <ul>
        <li>既然每次render都会执行effects，那么会不会造成性能问题？<br/> 
        在class组件中，我们会比较prevState，prevProps，只在关心的数据变化的时候才执行操作。<br/> 
        useEffect考虑到了这点，并且内置了这个这个功能，你可以主动告诉React在re-render的时候，如果你关心的那个值没有改变，那么本次就跳过执行effects。</li>
        <li>useEffect支持第二个参数，数组类型，数组元素为我们要优化的那个变量名</li>
        <SyntaxHighlighter>
          {`
            // 简单例子
            useEffect(() => {
              document.title = ${`You clicked $\{count} times`};
            }, [count]); // Only re-run the effect if count changes

            // 另一个例子
            useEffect(() => {
              ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
              return () => {
                ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
              };
            }, [props.friend.id]); // Only re-subscribe if props.friend.id changes
          `}
        </SyntaxHighlighter>
        如果只想在mount执行一次effects和unmount的时候执行一次清理，那么第二个参数传递空数组，这个effects不会重复执行。<br/>
        因此，第二参数传递[]的时候，useEffect会更接近componentDidMount和componentWillUnmount的效果。
      </ul>


    </div>
  );
}
