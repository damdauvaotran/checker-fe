import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, withRouter, Redirect
} from "react-router-dom";
import logo from './logo.svg';
import './App.scss';
import "antd/dist/antd.css";
import {directive} from '@babel/types';
import Layout from './shared-component/Layout'
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard'
import ExamRegister from "./pages/examRegister";
import i18n from "i18next";
import {withTranslation, useTranslation, initReactI18next} from "react-i18next";
import translationVI from './locales/vi.json';
import {isLogin} from './utils/auth'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      vi: {
        translation: translationVI,
      }
    },
    lng: "vi",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            {
              requireAuth(<ExamRegister/>)
            }
            Chán đ muốn code nũa
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/about'>
            About
          </Route>

          <Route path='/register'>
            <Register/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function requireAuth(component) {
  if (isLogin()) {
    return (
      component
    )
  }
  return <Redirect
    to={{
      pathname: "/login",
    }}
  />

}

export default App;
