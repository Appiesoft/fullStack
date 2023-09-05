import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitApp from "@mui/icons-material/ExitToApp";

import ListAlt from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import {logout} from "../../../../thunk/actions/userAction";
import './UserOptions.css'
const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use parentheses to invoke useNavigate
const alert = useAlert();
  const options = [
    { icon: <PersonIcon />, name: "Person Icon", func: orders },
    { icon: <ListAlt />, name: "Order Details", func: orders },
    { icon: <ExitApp />, name: "Log Out", func: logoutUser }
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard"); // Use navigate function
  }

  function orders() {
    navigate("/orders"); // Use navigate function
  }

  function account() {
    navigate("/account"); // Use navigate function
  }

  function logoutUser() {
    dispatch(logout());
    window.alert("Logout Successfully"); // Use window.alert for a basic alert
  }

  return (
    <>
   



<SpeedDial
      ariaLabel="SpeedDial basic example"
      direction="down"
      style={{zIndex:"11"}}
      sx={{ position: "fixed", top: 22, right: 38 ,background:"none" }}
      icon={
        <img
          className="SpeedDialIcon"
          src={user?.avatar?.url ? user?.avatar?.url : "/profile.png"}
          alt="profile"
        />
      }
    >
      {options.map((item) => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
        />
      ))}
    </SpeedDial>
    </>
  
  );
};

export default UserOptions;
