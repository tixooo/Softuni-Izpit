require("dotenv").config();
const mongoose = require("mongoose");

const connectionString = process.env.ATLAS_URI || "";

mongoose.connect = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});

mongoose.connection.on("connected", () =>
  console.log("Даже и базата данни се върза успешно... смятай")
);

mongoose.connection.on("disconnected", () => console.log("DB connection lost"));

module.exports = mongoose;
