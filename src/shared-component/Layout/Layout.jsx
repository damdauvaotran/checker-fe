import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import './layout.scss'

import {getUserData, clearUserToken} from '../../utils/auth'

const {SubMenu} = Menu;


const {Header, Content, Footer, Sider} = Layout;


export const withLayout = (seletedKey) => (WrappedComponent) => {

  class BasicLayout extends React.Component {

    state = {
      collapsed: false,
      isLogOut: false,
    };

    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({collapsed});
    };

    onLogOut = () => {
      clearUserToken()
      this.setState({
        isLogOut: true
      })
    }

    render() {
      if (this.state.isLogOut) {
        return (
          <Redirect to='/login'></Redirect>
        )
      }
      const data = getUserData()
      return (
        <Layout style={{minHeight: '100vh'}}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme='light'>
            <div className="logo">Checker</div>
            <Menu
              defaultSelectedKeys={[seletedKey]}
              style={{lineHeight: '64px'}}
              defaultOpenKeys={['admin']}
              mode="inline"
            >
              <Menu.Item key="1">
                 <span className="submenu-title-wrapper">
                  <Icon type="team"/>
                  Đăng ký thi
                </span>
              </Menu.Item>
              <Menu.Item key="3">
                 <span className="submenu-title-wrapper">
                  <Icon type="team"/>
                  Xem kết quả
                </span>
              </Menu.Item>
              {
                data.r === 2 && <SubMenu title={
                  <span className="submenu-title-wrapper">
                  <Icon type="team"/>
                  Admin
                </span>
                } key='admin'>
                  <Menu.Item key="admin1"><Link to='/admin/subject'>Quản lý môn thi</Link></Menu.Item>
                  <Menu.Item key="admin2"><Link to='/admin/room'>Quản lý phòng thi</Link></Menu.Item>
                  <Menu.Item key="admin3"><Link to='/admin/student'>Quản lý học sinh</Link></Menu.Item>
                  <Menu.Item key="admin4"><Link to='/admin/shift'>Quản lý ca thi</Link></Menu.Item>
                </SubMenu>
              }

            </Menu>
          </Sider>

          <Layout className="layout">
            <Header style={{background: '#fff', padding: 0}}>
              <div className='header'>
                <Button type="danger" onClick={this.onLogOut}>Logout</Button>
              </div>
            </Header>
            <Content style={{padding: '0 50px'}}>
              <div style={{background: '#fff', padding: 24, minHeight: 'calc(100vh - 64px - 79px)', marginTop: 10}}>
                <WrappedComponent/>
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Checker ©2018 Created by Checker Team</Footer>
          </Layout>
        </Layout>
      )
    }
  }

  return (() => (
      <BasicLayout/>
    )
  );
};

