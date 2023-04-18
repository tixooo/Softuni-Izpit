import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAuth } from "./AuthProvider";

export default function AdminDeleteInventory() {
  const [users, setUsers] = useState([]);
  const { deleteInventoryAdmin } = useAuth();

  useEffect(() => {
    const inner = async () => {
      fetch("http://localhost:8080/admin/getAllUsers", {
        method: "GET",
      }).then(async (res) => {
        if (res.status === 200) setUsers((await res.json()).users);
      });
    };
    inner();
  }, []);

  const deleteInventoryCb = (username, inventoryName) => {
    const userIndex = users.findIndex((u) => u.username === username),
      inventoryIndex = users[userIndex].data.inventories.findIndex(
        (i) => i.name === inventoryName
      );
    users[userIndex].data.inventories.splice(inventoryIndex, 1);
    setUsers([...users]);
  };

  return users.map((user) => (
    <div key={user.username}>
      <p>User: {user.username}</p>
      {user.data.inventories.map((inventory) => (
        <div key={inventory.name}>
          <span>{inventory.name} </span>
          <Button
            variant="contained"
            onClick={() =>
              deleteInventoryAdmin(
                user.username,
                inventory.name,
                deleteInventoryCb
              )
            }
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  ));
}
