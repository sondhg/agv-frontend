import React, { useState } from "react";
import {
  Menu,
  menuClasses,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "../Admin.scss";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarHeader } from "./components/SidebarHeader";
import { Typography } from "./components/Typography";

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const rtl = false; // * tránh eslint gạch chân báo lỗi, mặc định side bar nằm bên trái
  const [hasImage, setHasImage] = useState(true); // * có/không chèn ảnh vào sidebar
  const [theme, setTheme] = useState<Theme>("dark");

  // handle on theme change event
  const handleThemeChange = () => {
    // setTheme(e.target.checked ? "dark" : "light");
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleCollapseChange = () => {
    setCollapsed(!collapsed);
  };

  // handle on image change event
  const handleImageChange = () => {
    setHasImage(!hasImage);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1,
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1,
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  return (
    <div
      className="flex h-full" // h-full means height=100%. can change this to 100vh
      style={{
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={rtl}
        breakPoint="md"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1,
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div className="flex h-full flex-col">
          <SidebarHeader
            rtl={rtl}
            className="mb-6 mt-4 cursor-pointer"
            title="Collapse/Open sidebar"
            onClick={() => handleCollapseChange()}
          />
          <div className="mb-8 flex-1">
            <div className="mb-2 px-6 py-0">
              <Typography
                variant="body2"
                className="font-semibold"
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
              >
                Navigate
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles} id="navigation">
              <MenuItem
                icon={<i className="fa-solid fa-house"></i>}
                component={<Link to="/" />}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-gauge"></i>}
                component={<Link to="/admin" />}
                // suffix={<span className="badge red">New</span>}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-list-check"></i>}
                component={<Link to="/admin/manage-orders" />}
              >
                Manage Orders
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-calendar-days"></i>}
                component={<Link to="/admin/schedules" />}
              >
                Schedules
              </MenuItem>
            </Menu>

            <div className="mb-2 mt-8 px-6 py-0">
              <Typography
                className="font-semibold"
                variant="body2"
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
              >
                Sidebar ultilities
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles} id="customize-sidebar">
              <MenuItem
                icon={
                  collapsed ? (
                    <i className="fa-solid fa-toggle-off"></i>
                  ) : (
                    <i className="fa-solid fa-toggle-on"></i>
                  )
                }
                onClick={() => handleCollapseChange()}
              >
                {collapsed ? "" : "Collapse"}
              </MenuItem>
              <SubMenu
                icon={<i className="fa-solid fa-gear"></i>}
                label="Customize"
              >
                <MenuItem
                  icon={
                    theme === "dark" ? (
                      <i className="fa-solid fa-moon"></i>
                    ) : (
                      <i className="fa-solid fa-sun"></i>
                    )
                  }
                  title={`Switch between themes (currently ${theme} theme)`}
                  onClick={() => handleThemeChange()}
                >
                  {theme === "dark" ? "Dark theme" : "Light theme"}
                </MenuItem>
                <MenuItem
                  icon={
                    hasImage ? (
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash"></i>
                    )
                  }
                  title={`Insert background image: currently ${hasImage}`}
                  onClick={() => handleImageChange()}
                >
                  {hasImage ? "Show image" : "Hide image"}
                </MenuItem>
              </SubMenu>
            </Menu>
          </div>

          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>

      <main>
        <div className="px-6 py-4" style={{ color: "#44596e" }}>
          <div className="mb-4">
            {broken && (
              <button
                className="sb-button"
                onClick={() => setToggled(!toggled)}
              >
                Toggle
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
