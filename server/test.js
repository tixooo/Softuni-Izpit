const axios = require("axios");

axios.post("http://localhost:8080/auth/signUp", {
  username: "viktor4",
  password: "123",
  role: "whatever",
  data: { inventories: [] },
});

//axios
//  .post("http://localhost:8080/admin/deleteUser", {
//    user: "viktor4",
//  })
//  .then((res) => console.log(res));

//axios
//  .post("http://localhost:8080/admin/deleteInventory", {
//    user: "viktor4",
//    inventory: "storehouse 1",
//  })
//  .then((res) => console.log(res));

//// CREATE INVENTORY API CALL
//axios
//  .post("http://localhost:8080/user/createInventory", {
//    inventory: {
//      name: "storehouse 1",
//      items: [
//        {
//          name: "item1",
//          quantity: 1,
//        },
//        {
//          name: "item2",
//          quantity: 3,
//        },
//      ],
//    },
//    from: "viktor4",
//  })
//  .then((res) => console.log(res.status));

//// ADD ITEM(S) API CALL
//axios
//  .post("http://localhost:8080/user/addItems", {
//    from: "viktor4",
//    inventoryName: "storehouse 1",
//    inventoryItems: [{ name: "i3", quantity: 20 }],
//  })
//  .then((res) => console.log(res));

//// EDIT ITEM API CALL
//axios
//  .post("http://localhost:8080/user/editItem", {
//    from: "viktor4",
//    inventory: "storehouse 1",
//    item: { name: "i3", quantity: 20 },
//    itemReplacement: { name: "i3", quantity: 30 },
//  })
//  .then((res) => console.log(res));

//// DELETE ITEM API CALL
//axios
//  .post("http://localhost:8080/user/deleteItem", {
//    from: "viktor4",
//    inventoryName: "storehouse 1",
//    inventoryItem: { name: "i2", quantity: 15 },
//  })
//  .then((res) => console.log(res));
