import { Link } from "react-router-dom";
import { MENUS } from "@/config/menu";
import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row, Menu } from "antd";
import User from "../User/user";

const { Header } = Layout;

const Navigation = () => {
  const menuList = Object.values(MENUS);

  return (
    <Menu mode="horizontal">
      {
        menuList.map((menu, key) => (
          <Menu.Item key={key}>
            <Link to={menu.url} className="nav-link">{menu.title}</Link>
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Row>
        <Col>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: toggle,
          })}
        </Col>
        <Col flex="auto">
          <Navigation />
        </Col>
        <Col span={1}>
          <User />
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
