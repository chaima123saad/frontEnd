import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FundViewOutlined,
  ProjectOutlined,
  DashboardOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  CarryOutOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  CommentOutlined
} from "@ant-design/icons";
import img from "./tasks.png";
import { useWindowSize } from "../../utils/useWindowSize"; 
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import "./sidebarOwner.css";
import { Layout, Menu, theme } from "antd";
import React, { useState,useEffect } from "react";
import HeaderTwo from "../../components/manager/header";
const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const { id } = useParams();
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
      icon: <DashboardOutlined />,
      label: "Dashboard",
      route:`/owner/${id}`,
    },
    {
      key: "nav33",
      icon: <ProjectOutlined />,
      label: "My projects",
      route: `/owner/${id}/myproject`,
    },
    {
      key: "nav22",
      icon: <FundViewOutlined />,
      label: "Supervise",
      route: `/owner/${id}/supervise`,
    },
    {
      key: "chat",
      icon: <CommentOutlined />,
      label: "Chat",
      route: `/owner/${id}/chat`,
    },
    {
      key: "nav66",
      icon: <CarryOutOutlined />,
      label: "Task",
      route: `/owner/${id}/task`,
    },
    
  ]
  const items = links.map((item) => {
    return {
      key: item.route || item.name.toLowerCase(),
      label: <Link to={item.route}>{item.label}</Link>,
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
        overflow:'hidden'
      }}
    >
      <Header
      className="head__"
        style={{
          padding: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          zIndex: 1,
          
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
          <img src={img} style={{ paddingLeft: "1.5rem",height:30 }}/>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
              style:{color:"#5f5f5f"}
            }
          )}

          <HeaderTwo />
        </div>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
  {items.map((item) => (
    <Menu.Item key={item.key} icon={item.icon}>
      {item.label}
    </Menu.Item>
  ))}
</Menu>

        </Sider>
        <Layout
          style={{ padding: "0 24px 24px", background: colorBgContainer ,overflow:"scroll"}}
        >
          <Content
            style={{
              padding: 0,
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

export default Sidebar;
