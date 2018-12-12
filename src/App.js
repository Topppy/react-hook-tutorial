// import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StateHook from './views/StateHook';
import EffectHook from './views/EffectHook';
import Rules from './views/Rules';
import Home from './views/Home';
import CustomHooks from './views/CustomHooks';

const AppRouter = () => (
  <Router basename="/react-hook-tutorial" >
    <div>
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
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/state-hook/" component={StateHook} />
      <Route path="/effect-hook/" component={EffectHook} />
      <Route path="/rules" exact component={Rules} />
      <Route path="/custom-hooks" exact component={CustomHooks} />
    </div>
  </Router>
);

export default AppRouter;