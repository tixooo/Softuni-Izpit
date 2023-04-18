import React, { useState } from "react";
import { Button } from "@mui/material";

export default function AddItems({ items, setItems }) {
  const [inputValue, setInputValue] = useState({ name: "", quantity: "" });

  const handleAddItem = () => {
    setItems([...items, inputValue]);
    setInputValue({ name: "", quantity: "" });
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label>Item</label>
      <input
        type="text"
        id="itemInput"
        value={inputValue.name}
        onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
      />
      <br />
      <label htmlFor="quantityInput">Quantity</label>
      <input
        type="number"
        id="quantityInput"
        value={inputValue.quantity}
        onChange={(e) =>
          setInputValue({ ...inputValue, quantity: e.target.value })
        }
      />
      <br />
      <Button variant="contained" type="button" onClick={handleAddItem}>
        Add Item
      </Button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.quantity}x {item.name}
            <Button variant="contained" onClick={() => handleDeleteItem(index)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
