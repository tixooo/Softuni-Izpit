import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import { ListItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { getUserData, logOut } = useAuth();
  return (
    <>
      {getUserData("user.role") === "user" ? (
        <>
          <List component="nav">
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
            <ListItem component={Link} onClick={logOut}>
              <LogoutIcon>
                <LayersIcon />
              </LogoutIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
          </List>
        </>
      ) : null}
      <Outlet />
    </>
  );
}
