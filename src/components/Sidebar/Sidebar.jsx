import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
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
import "./sidebar.css";
import { Layout, Menu, theme } from "antd";
import React, { useState,useEffect } from "react";
import HeaderTwo from "../manager/header";
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
      route:`/manager/${id}`,
    },
    {
      key: "nav2",
      icon: <FundProjectionScreenOutlined />,
      label: "Manage projects",
      route: `/manager/${id}/projects`,
    },
    {
      key: "nav3",
      icon: <ProjectOutlined />,
      label: "My projects",
      route: `/manager/${id}/nav3`,
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Employee",
      route: `/manager/${id}/users`,
    },
    {
      key: "nav5",
      icon: <TeamOutlined />,
      label: "Team",
      route: `/manager/${id}/nav5`,
    },
    {
      key: "chat",
      icon: <CommentOutlined />,
      label: "Chat",
      route: `/manager/${id}/chat`,
    },
    {
      key: "nav6",
      icon: <CarryOutOutlined />,
      label: "Task",
      route: `/manager/${id}/nav6`,
    },
    {
      key: "nav7",
      icon: <FolderOpenOutlined />,
      label: "Explore archive",
      route: `/manager/${id}/nav7`,
    },
    {
      key: "nav8",
      icon: <HistoryOutlined />,
      label: "Check my history",
      route: `/manager/${id}/nav8`,
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
