import './App.css';
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import StateHook from './views/StateHook';
import EffectHook from './views/EffectHook';
import Rules from './views/Rules';
import Home from './views/Home';
import CustomHooks from './views/CustomHooks';
import Play from './views/Play';
import TDList from './views/TDList';

const AppRouter = () => (
  <Router >
    <div className='App'>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/state-hook/">State Hook</Link>
          </li>
          <li>
            <Link to="/effect-hook/">Effect Hook</Link>
          </li>
          <li>
            <Link to="/rules/">Hooks规则</Link>
          </li>
          <li>
            <Link to="/custom-hooks/">自定义Hooks</Link>
          </li>
          <li>
            <Link to="/todo-list/">实现TODO List</Link>
          </li>
          {/* <li>
            <Link to="/play/">玩一下Hooks</Link>
          </li> */}
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/state-hook/" component={StateHook} />
      <Route path="/effect-hook/" component={EffectHook} />
      <Route path="/rules/" component={Rules} />
      <Route path="/custom-hooks/" component={CustomHooks} />
      <Route path="/todo-list/" component={TDList} />
      <Route path="/play/" component={Play} />

    </div>
  </Router>
);

export default AppRouter;