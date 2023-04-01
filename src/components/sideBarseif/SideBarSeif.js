import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './sidebar.css'
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import HeaderTwo from "../manager/header";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout style={{ height: '100vh',display:"flex", flexDirection:"column" ,backgrounColor:'#fff !important'}}>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          // height: '20vh',
          zIndex: 1,
          borderBottom:'1px solid gray'
        }}
      >
        <div style={{ flex: 1 , display:"flex", alignItems:'center', gap:'2rem'}}>
        <h1 style={{paddingLeft:'1.5rem'}}>LOGO</h1>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          
          <HeaderTwo />
        </div>
        
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', background: colorBgContainer }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
