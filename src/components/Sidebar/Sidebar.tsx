import { Link } from "react-router-dom";
import { PERMISSION } from "@/config/permission";
import { Layout, Menu } from "antd";
import { useState } from "react";

const { Sider } = Layout;

interface SidebarProps {
  menu?: string;
}

const Sidebar = (props: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const menu = props.menu || "";
  const sidebarMenu = PERMISSION[menu] || [];
  const sidebarMenuKeys = Object.keys(sidebarMenu);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <Link to="/">
          <p
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ESM
          </p>
        </Link>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {sidebarMenuKeys.map((menu, key) => (
          <Menu.Item key={key}>
            <Link to={sidebarMenu[menu].url}>
              <p>
                <i className={sidebarMenu[menu].icon as string}></i>
                {sidebarMenu[menu].title}
              </p>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
