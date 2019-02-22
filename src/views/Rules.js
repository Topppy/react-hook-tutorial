import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

export default function Rules() {
  const [count, setCount] = useState(0);
  const [double, setDouble] = useState(0);
  const [three, setThree] = useState(0);

  return (
    <div>
      <h1>Hooks规则：</h1>
      <p>You clicked +1 button {count} times</p>
      <p>You clicked +2 button {double} times</p>
      <p>You clicked +3 button {three} times</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
      <button onClick={() => setDouble(double + 1)}>
        +2
      </button>
      <button onClick={() => setThree(three + 1)}>
        +3
      </button>
      <ul>
        <li>只能在顶级调用Hooks。</li>
        <p>不能在循环，条件判断，嵌套函数中调用Hooks。确保每次render的时候，hooks都是相同的顺序</p>
        <li>不能在普通的js函数中调用Hooks</li>
        <ol>
          <li>可以在React function组件中调用Hooks。</li>
          <li>可以在自定义Hooks中调用Hooks。</li>
        </ol>
      </ul>
      官方提供<a href='https://www.npmjs.com/package/eslint-plugin-react-hooks'>linter</a>来校验这些规则

      <h3>为什么Hooks要保证顺序不变？</h3>
      <p>当一个fucntion组件中有多个Hooks时，React是如何知道每个useState对应的是哪个state？</p>
      <p>React官方给的答案是：React依赖于Hooks被调用的顺序。当然我看完并没有明白为啥，于是在源码useState函数里打了断点</p>
      <p>最后定位到react-dom源码的useReducer函数，在该函数中，workInProgressHook是以单链表的方式存放Hooks，React只能按照顺序使用next来逐一执行每个Hook，无法跳过</p>
      <SyntaxHighlighter language='javascript' style={docco}>
        {`
        function useReducer(reducer, initialState, initialAction) {
          currentlyRenderingFiber$1 = resolveCurrentlyRenderingFiber();
          workInProgressHook = createWorkInProgressHook();
          var queue = workInProgressHook.queue;
          if (queue !== null) {
            // Already have a queue, so this is an update.
            if (isReRender) {
              // This is a re-render. Apply the new render phase updates to the previous
              var _dispatch2 = queue.dispatch;
              if (renderPhaseUpdates !== null) {
                // Render phase updates are stored in a map of queue -> linked list
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== undefined) {
                  renderPhaseUpdates.delete(queue);
                  var newState = workInProgressHook.memoizedState;
                  var update = firstRenderPhaseUpdate;
                  do {
                    // Process this render phase update. We don't have to check the
                    // priority because it will always be the same as the current
                    // render's.
                    var _action = update.action;
                    newState = reducer(newState, _action);
                    update = update.next;
                  } while (update !== null);
        
                  workInProgressHook.memoizedState = newState;
        
                  // Don't persist the state accumlated from the render phase updates to
                  // the base state unless the queue is empty.
                  // TODO: Not sure if this is the desired semantics, but it's what we
                  // do for gDSFP. I can't remember why.
                  if (workInProgressHook.baseUpdate === queue.last) {
                    workInProgressHook.baseState = newState;
                  }
        
                  return [newState, _dispatch2];
                }
              }
              return [workInProgressHook.memoizedState, _dispatch2];
            }
        
            // The last update in the entire queue
            var _last = queue.last;
            // The last update that is part of the base state.
            var _baseUpdate = workInProgressHook.baseUpdate;
        
            // Find the first unprocessed update.
            var first = void 0;
            if (_baseUpdate !== null) {
              if (_last !== null) {
                // For the first update, the queue is a circular linked list where
                // \`queue.last.next = queue.first\`. Once the first update commits, and
                // the \`baseUpdate\` is no longer empty, we can unravel the list.
                _last.next = null;
              }
              first = _baseUpdate.next;
            } else {
              first = _last !== null ? _last.next : null;
            }
            if (first !== null) {
              var _newState = workInProgressHook.baseState;
              var newBaseState = null;
              var newBaseUpdate = null;
              var prevUpdate = _baseUpdate;
              var _update = first;
              var didSkip = false;
              do {
                var updateExpirationTime = _update.expirationTime;
                if (updateExpirationTime < renderExpirationTime) {
                  // Priority is insufficient. Skip this update. If this is the first
                  // skipped update, the previous update/state is the new base
                  // update/state.
                  if (!didSkip) {
                    didSkip = true;
                    newBaseUpdate = prevUpdate;
                    newBaseState = _newState;
                  }
                  // Update the remaining priority in the queue.
                  if (updateExpirationTime > remainingExpirationTime) {
                    remainingExpirationTime = updateExpirationTime;
                  }
                } else {
                  // Process this update.
                  var _action2 = _update.action;
                  _newState = reducer(_newState, _action2);
                }
                prevUpdate = _update;
                _update = _update.next;
              } while (_update !== null && _update !== first);
        
              if (!didSkip) {
                newBaseUpdate = prevUpdate;
                newBaseState = _newState;
              }
        
              workInProgressHook.memoizedState = _newState;
              workInProgressHook.baseUpdate = newBaseUpdate;
              workInProgressHook.baseState = newBaseState;
            }
        
            var _dispatch = queue.dispatch;
            return [workInProgressHook.memoizedState, _dispatch];
          }
        
          // There's no existing queue, so this is the initial render.
          if (reducer === basicStateReducer) {
            // Special case for \`useState\`.
            if (typeof initialState === 'function') {
              initialState = initialState();
            }
          } else if (initialAction !== undefined && initialAction !== null) {
            initialState = reducer(initialState, initialAction);
          }
          workInProgressHook.memoizedState = workInProgressHook.baseState = initialState;
          queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          };
          var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
          return [workInProgressHook.memoizedState, dispatch];
        }
        `}
      </SyntaxHighlighter>
      <p>那么，如果你需要使用条件判断，可以移到Hooks的effects函数内部</p>
      <SyntaxHighlighter language='javascript' style={docco}>
        {`
         useEffect(function persistForm() {
          // 👍 We're not breaking the first rule anymore
          if (name !== '') {
            localStorage.setItem('formData', name);
          }
        });
        `}
      </SyntaxHighlighter>
    </div>
  );
}