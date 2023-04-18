import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import { ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default () => {
  const { logOut } = useAuth();
  return (
    <React.Fragment>
      <ListItem component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem component={Link} to="/createInventory">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Create inventory" />
      </ListItem>
      <ListItem component="button" onClick={logOut}>
        <LogoutIcon>
          <LayersIcon />
        </LogoutIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </React.Fragment>
  );
};
