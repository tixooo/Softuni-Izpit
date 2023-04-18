import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import AddItems from "./AddItems";
import { useState } from "react";

export default function InventoryDisplay() {
  const location = useLocation();
  const [items, setItems] = useState(location.state.inventory.items);
  const { onDeleteItem, onAddItems } = useAuth();

  const inventory = location.state.inventory;
  return;
}
