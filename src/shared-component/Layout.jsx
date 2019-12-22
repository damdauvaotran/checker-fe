import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;

export const withLayout = (WrappedComponent) => {
  return (() => (
      <Layout className="layout">
        <Header>
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1"><Link to='about'>About</Link></Menu.Item>
            <Menu.Item key="2"><Link to='login'></Link></Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: '0 50px'}}>
          <div style={{background: '#fff', padding: 24, minHeight: 'calc(100vh - 64px - 69px)'}}>
            <WrappedComponent/>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Checker ©2018 Created by Checker Team</Footer>
      </Layout>
    )
  );
};

