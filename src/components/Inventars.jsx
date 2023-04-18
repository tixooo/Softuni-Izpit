import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Title from "./Title";
import { useAuth } from "./AuthProvider";

export default function Inventars() {
  const {
    getUserData,
    setUserInventories,
    onEditItem,
    onDeleteItem,
    onAddItems,
    result,
  } = useAuth();
  const [inventories, setInventories] = useState(
    getUserData("user.data.inventories")
  );
  const [showInventory, setShowInventory] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const onEditItemSubmit = (e, inventory, item, cb) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const itemReplacement = {
      name: item.name,
      quantity: data.get("itemQuantity"),
    };
    setEditItem(false);
    onEditItem(inventory, item, itemReplacement, cb);
  };

  const onEditItemCb = (inventory, item, itemReplacement) => {
    inventory.items.splice(
      inventory.items.findIndex((i) => i.name === item.name),
      1,
      itemReplacement
    );
    const inventoryIndex = inventories.findIndex(
      (i) => i.name === inventory.name
    );
    if (inventoryIndex !== -1) {
      inventories[inventoryIndex] = inventory;
      setUserInventories(inventories);
      setShowInventory({ ...showInventory, items: inventory.items });
    }
  };

  const onAddItemsSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    showInventory.items.push({
      name: data.get("itemName"),
      quantity: data.get("itemQuantity"),
    });
    setShowInventory({ ...showInventory });
  };

  const onSaveItemsCb = (inventory, items) => {
    inventory.items = items;
    const inventoryIndex = inventories.findIndex(
      (i) => i.name === inventory.name
    );
    if (inventoryIndex !== -1) {
      inventories[inventoryIndex] = inventory;
      setUserInventories(inventories);
    }
  };

  const onDeleteItemCb = (inventory, item) => {
    inventory.items.splice(
      inventory.items.findIndex((i) => i.name === item.name),
      1
    );
    const inventoryIndex = inventories.findIndex(
      (i) => i.name === inventory.name
    );
    if (inventoryIndex !== -1) {
      inventories[inventoryIndex] = inventory;
      setUserInventories(inventories);
      setShowInventory({ ...showInventory, items: inventory.items });
    }
  };

  return (
    <>
      {!showInventory ? (
        <>
          <Title>My inventories</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name of inventory</TableCell>
                <TableCell>Number of items inside </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventories.map((inventory, inx) => (
                <TableRow key={inx}>
                  <TableCell onClick={() => setShowInventory(inventory)}>
                    {inventory.name}
                  </TableCell>
                  <TableCell>{inventory.items.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <h4>Inventory: {showInventory.name}</h4>
          {showInventory.items.length > 0 ? (
            <>
              <span>Items: </span>
              <ol>
                {showInventory.items.map((item, idx) => (
                  <li key={idx}>
                    <p>
                      {item.quantity} x {item.name}
                    </p>
                    <Button
                      variant="contained"
                      onClick={() => setEditItem(!editItem ? idx + 1 : false)}
                    >
                      Edit
                    </Button>
                    {editItem === idx + 1 && (
                      <>
                        <form
                          onSubmit={(e) =>
                            onEditItemSubmit(
                              e,
                              showInventory,
                              item,
                              onEditItemCb
                            )
                          }
                        >
                          <span>New quantity: </span>
                          <input type="number" name="itemQuantity" />
                          <Button variant="contained" type="submit">
                            Save
                          </Button>
                        </form>
                      </>
                    )}
                    <Button
                      variant="contained"
                      onClick={() =>
                        onDeleteItem(
                          showInventory,
                          showInventory.items[idx],
                          onDeleteItemCb
                        )
                      }
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p>No items in this inventory</p>
          )}
          <p>Add items: </p>
          <form onSubmit={onAddItemsSubmit}>
            <span>Item name: </span>
            <input type="text" name="itemName" />
            <br />
            <span>Item quantity: </span>
            <input type="number" name="itemQuantity" />
            <br />
            <Button variant="contained" type="submit">
              Add item
            </Button>
            <br />
          </form>
          <Button
            variant="contained"
            style={{ margin: "5px" }}
            onClick={() =>
              onAddItems(showInventory, showInventory.items, onSaveItemsCb)
            }
          >
            Save inventory
          </Button>
          <Button variant="contained" onClick={() => setShowInventory(null)}>
            Back
          </Button>
          {result && <p>{result}</p>}
        </>
      )}
    </>
  );
}
