import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import MainListItem from "./listItems";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

export default function NavBar() {
  const { getUserData } = useAuth();

  return (
    <>
      {getUserData("user.role") === "user" ? (
        <>
          <List component="nav">
            <MainListItem />
            <Divider sx={{ my: 1 }} />
          </List>
        </>
      ) : null}
      <Outlet />
    </>
  );
}
