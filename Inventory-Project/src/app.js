const express = require("express"),
  cors = require("cors"),
  authRouter = require("./routes/users"),
  userRouter = require("./routes/inventory"),
  adminRouter = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(8080, () => {
  console.log("Аре брат. Връзка има с експреса ;)");
});
