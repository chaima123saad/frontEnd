import React from 'react';

import { Sidebar, SidebarItem } from '../../src';
import { Router, Route, browserHistory } from 'react-router'

let items = [
 
  <SidebarItem
    leftIcon={<Dashboard />}
    href="/dashboard" >
    Dashboard
  </SidebarItem>,
  <SidebarItem leftIcon={<User />}
   href="/profile">
    Profile
  </SidebarItem>,
  <SidebarItem title="Settings" leftIcon={<Gear />} href="/settings">
    Settings
  </SidebarItem>,
];

const App = (props) => <Sidebar content={items}>{props.children}</Sidebar>;
const DashPage = (props) => <div><h1>Dashboard</h1></div>;
const ProfilePage = (props) => <div><h1>Profile</h1></div>;
const SettingsPage = (props) => <div><h1>Settings</h1></div>;

const Root = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="dashboard" component={DashPage} />
      <Route path="profile" component={ProfilePage} />
      <Route path="settings" component={SettingsPage} />
    </Route>
  </Router>
);

export default Root;
