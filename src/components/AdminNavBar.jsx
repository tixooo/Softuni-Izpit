import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

export default function AdminNavBar() {
  return (
    <List component="nav">
      <ListItem component={Link} to="/deleteUser">
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete user" />
      </ListItem>
      <ListItem component={Link} to="/deleteUserInventory">
        <ListItemIcon>
          <ClearIcon />
        </ListItemIcon>
        <ListItemText primary="Delete user inventory" />
      </ListItem>
      <Divider sx={{ my: 1 }} />
    </List>
  );
}
