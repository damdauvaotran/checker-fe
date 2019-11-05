import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.scss';
import "antd/dist/antd.css";
import { directive } from '@babel/types';
import Layout from './shared-component/Layout'
import Login from './pages/login'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path='/about'>
            About
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
