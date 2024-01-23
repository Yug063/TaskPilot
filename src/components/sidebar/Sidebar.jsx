import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import React from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const remove = () => {
    localStorage.removeItem("user"); 
  };

  return (
    <div>
      <div className="sidebar  ">
        <div className="center ">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to="/todo" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>To Do list</span>
              </li>
            </Link>

            <p className="title">USEFUL</p>
            <li>
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>

            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <Link to="/users/test">
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <ExitToAppIcon className="icon" />

              <span>
                <Link to="/login" onClick={remove}>
                  <button onClick={remove}>Logout</button>
                </Link>
              </span>
            </li>
          </ul>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default Sidebar;
