import './App.css';
import React from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { Row, Col } from 'antd';
import StateHook from './views/StateHook';
import EffectHook from './views/EffectHook';
import Rules from './views/Rules';
import Home from './views/Home';
import CustomHooks from './views/CustomHooks';
// import Play from './views/Play';
import TDList from './views/TDList';
import UseReducer from './views/UseReducer';
import StateTable from './views/StateTable';
import StateHookTable from './views/StateHookTable';
import ReducerHookTable from './views/ReducerHookTable';
import TableHookTable from './views/TableHookTable';

const AppRouter = () => (
  <Router >
    <div className='App'>
      <Row>
        <Col span={18}>
          <Route path="/" exact component={Home} />
          <Route path="/state-hook/" component={StateHook} />
          <Route path="/effect-hook/" component={EffectHook} />
          <Route path="/rules/" component={Rules} />
          <Route path="/custom-hooks/" component={CustomHooks} />
          <Route path="/todo-list/" component={TDList} />
          <Route path="/reducer-hook/" component={UseReducer} />
          <Route path="/table/" component={StateTable} />
          <Route path="/state-hook-table/" component={StateHookTable} />
          <Route path="/reducer-hook-table/" component={ReducerHookTable} />
          <Route path="/table-hook-table/" component={TableHookTable} />
        </Col>
        <Col span={6}>
          <nav>
            <ul>
              <li>
                <NavLink activeClassName='active'  exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/state-hook/">State Hook</NavLink>
              </li>
              <li>
                <NavLink to="/effect-hook/">Effect Hook</NavLink>
              </li>
              <li>
                <NavLink to="/rules/">Hooks规则</NavLink>
              </li>
              <li>
                <NavLink to="/custom-hooks/">自定义Hooks</NavLink>
              </li>
              <li>
                <NavLink to="/todo-list/">实现TODO List</NavLink>
              </li>
              <li>
                <NavLink to="/reducer-hook/">Reducer Hook</NavLink>
              </li>
              <li>
                <NavLink to="/table/">state表格实例</NavLink>
              </li>
              <li>
                <NavLink to="/state-hook-table/">State Hook表格实例</NavLink>
              </li>
              <li>
                <NavLink to="/reducer-hook-table/">Reducer Hook表格实例</NavLink>
              </li>
              <li>
                <NavLink to="/table-hook-table/">自定义Table Hook表格实例</NavLink>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </div>
  </Router>
);

export default AppRouter;