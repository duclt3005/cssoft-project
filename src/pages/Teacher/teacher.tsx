import { Layout } from "antd";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Header/Header";
import RouterTeacher from "./router/router";

const { Content } = Layout;

// TODO: talk

/**
 * Home
 */
export default function Teacher() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar menu="teacher" />
      <Layout className="site-layout">
        <Navbar />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="content-wrapper">
            <RouterTeacher />
          </div>
          <div id="sidebar-overlay"></div>
        </Content>
      </Layout>
    </Layout>
  );
}
