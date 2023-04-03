import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useWindowSize } from "../../utils/useWindowSize"; 
import { Link, Outlet, useLocation } from "react-router-dom";
import "./sidebar.css";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import HeaderTwo from "../manager/header";
import MenuDropdown from "../MenuDropDown/MenuDropdown";
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const width = useWindowSize();
 if (width < 700 ){
  setCollapsed(true)
 } 
 console.log(collapsed,'collapsed');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const links =[
    {
      key: "nav1",
      icon: <UserOutlined />,
      label: "nav 1",
      route: "/",
    },
    {
      key: "nav2",
      icon: <VideoCameraOutlined />,
      label: "nav 2",
      route: "/nav2",
    },
    {
      key: "nav3",
      icon: <UploadOutlined />,
      label: "nav 3",
      route: "/nav3",
    },
  ]
  const items = links.map((item) => {
    return {
      key: item.route || item.name.toLowerCase(),
      label: item.route ? <Link to={item.route}>{item.label}</Link> : item.label,
      icon: item.icon,
    };
  });
  
  return (
    <Layout
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgrounColor: "#fff !important",
      }}
    >
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          zIndex: 1,
          borderBottom: "1px solid gray",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <h1 style={{ paddingLeft: "1.5rem" }}>LOGO</h1>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <HeaderTwo />
        </div>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={items}
            // onClick={({ key }) => {
            //   window.location.href = key;
            // }}
          />
        </Sider>
        <Layout
          style={{ padding: "0 24px 24px", background: colorBgContainer }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
