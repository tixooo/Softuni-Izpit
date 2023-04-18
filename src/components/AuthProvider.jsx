import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const getUserData = (key) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) return null;
    let keys = key.split(".");
    keys.forEach((key) => (user = user[key]));

    return user;
  };

  const setUserData = (key, value) => {
    const user = JSON.parse(localStorage.getItem("user"));

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        user: {
          ...user.user,
          data: {
            ...user.user.data,
            inventories: [...user.user.data.inventories, value],
          },
        },
      })
    );
  };

  const setUserInventories = (inventories) => {
    const user = JSON.parse(localStorage.getItem("user"));

    user.user.data.inventories = inventories;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const signUp = (user) => {
    fetch("http://localhost:8080/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        role: user.role,
        data: user.data,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if ("user" in user) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, isLoggedIn: true })
          );
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signIn = (user) => {
    fetch("http://localhost:8080/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if ("user" in user) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, isLoggedIn: true })
          );
          if (user.user.role === "admin") navigate("/deleteUser");
          else navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteInventory = (inventory, cb) => {
    fetch("http://localhost:8080/user/deleteInventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getUserData("user.username"),
        inventoryName: inventory,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        cb(inventory);
        setResult("Successfuly deleted your inventory");
      } else {
        setResult("Error on deleting inventory.");
      }
      setTimeout(() => {
        setResult(null);
      }, 3000);
    });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const deleteUser = (username, cb) => {
    fetch("http://localhost:8080/admin/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
      }),
    }).then(async (res) => {
      if (res.status === 200) cb(username);
    });
  };

  const deleteInventoryAdmin = (user, inventory, cb) => {
    console.log(user.username);
    fetch("http://localhost:8080/admin/deleteInventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        inventory,
      }),
    }).then((res) => {
      if (res.status === 200) cb(user, inventory);
    });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = {
      username: data.get("userName"),
      password: data.get("password"),
    };
    signIn(user);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = {
      username: data.get("userName"),
      password: data.get("password"),
      role: "user",
      data: {
        inventories: [],
      },
    };

    signUp(user);
  };

  const createInventory = async (e, items) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget),
      inventoryName = data.get("inventoryName");

    fetch("http://localhost:8080/user/createInventory", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from: getUserData("user.username"),
        inventory: { name: inventoryName, items },
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setResult("Successfuly created your inventory");
        setUserData("user.data", { name: inventoryName, items });
        navigate("/dashboard");
      } else {
        setResult("Error on creating inventory.");
        console.log((await res.json()).error);
      }
      setTimeout(() => {
        setResult(null);
      }, 3000);
    });
  };

  const onAddItems = async (inventory, items, cb) => {
    fetch("http://localhost:8080/user/addItems", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from: getUserData("user.username"),
        inventoryName: inventory.name,
        inventoryItems: items,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setResult("Successfuly added your items.");
        cb(inventory, items);
      } else {
        setResult("Error on adding items.");
        console.log((await res.json()).error);
      }
      setTimeout(() => {
        setResult(null);
      }, 3000);
    });
  };

  const onDeleteItem = async (inventory, item, cb) => {
    fetch("http://localhost:8080/user/deleteItem", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from: getUserData("user.username"),
        inventoryName: inventory.name,
        inventoryItem: item,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setResult("Successfuly deleted your items.");
        cb(inventory, item);
      } else {
        setResult("Error on deliting items.");
        console.log((await res.json()).error);
      }
      setTimeout(() => {
        setResult(null);
      }, 3000);
    });
  };

  const onEditItem = async (inventory, item, itemReplacement, cb) => {
    fetch("http://localhost:8080/user/editItem", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from: getUserData("user.username"),
        inventory: inventory.name,
        itemReplacement,
        item: { ...item, quantity: parseInt(item.quantity) },
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setResult("Successfuly edited your items.");
        cb(inventory, item, itemReplacement);
      } else {
        setResult("Error on editing items.");
        console.log((await res.json()).error);
      }
      setTimeout(() => {
        setResult(null);
      }, 3000);
    });
  };

  const auth = {
    signUp,
    onSignUp,
    getUserData,
    createInventory,
    onDeleteItem,
    onAddItems,
    setUserInventories,
    onEditItem,
    onSignIn,
    deleteUser,
    deleteInventoryAdmin,
    logOut,
    result,
    deleteInventory,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
