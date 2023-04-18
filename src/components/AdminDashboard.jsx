import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "@mui/material";

export default function AdminDashboard() {
  const { deleteUser, deleteInventory } = useAuth();
  const [action, setAction] = useState(null);
  const [users, setUsers] = useState([]);

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

  const deleteUserCb = (username) => {
    const userIndex = users.findIndex((u) => u.username === username);
    users.splice(userIndex, 1);
    setUsers([...users]);
  };

  const deleteInventoryCb = (username, inventoryName) => {
    const userIndex = users.findIndex((u) => u.username === username),
      inventoryIndex = users[userIndex].data.inventories.findIndex(
        (i) => i.name === inventoryName
      );
    users[userIndex].data.inventories.splice(inventoryIndex, 1);
    setUsers([...users]);
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => setAction(action === "deleteUser" ? null : "deleteUser")}
      >
        Delete User
      </button>
      <button
        onClick={() =>
          setAction(action === "deleteInventory" ? null : "deleteInventory")
        }
      >
        Delete Inventory
      </button>
      {action === "deleteUser" ? (
        <>
          <p>All users: </p>
          {users.map((user) => (
            <div key={user.username}>
              <p>{user.username}</p>
              <Button
                variant="contained"
                onClick={() => deleteUser(user.username, deleteUserCb)}
              >
                Delete
              </Button>
            </div>
          ))}
        </>
      ) : action === "deleteInventory" ? (
        users.map((user) => (
          <div key={user.username}>
            <p>{user.username}</p>
            {user.data.inventories.map((inventory) => (
              <div key={inventory.name}>
                <p>{inventory.name}</p>
                <button
                  onClick={() =>
                    deleteInventory(
                      user.username,
                      inventory.name,
                      deleteInventoryCb
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))
      ) : null}
    </>
  );
}
