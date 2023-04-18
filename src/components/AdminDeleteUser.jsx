import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "@mui/material";

export default () => {
  const [users, setUsers] = useState([]);

  const { deleteUser } = useAuth();
  const deleteUserCb = (username) => {
    const userIndex = users.findIndex((u) => u.username === username);
    users.splice(userIndex, 1);
    setUsers([...users]);
  };

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

  return (
    <>
      <p>All users: </p>
      {users.map((user, idx) => (
        <div key={idx}>
          <span>Username: {user.username} </span>
          <Button
            variant="contained"
            onClick={() => deleteUser(user.username, deleteUserCb)}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
