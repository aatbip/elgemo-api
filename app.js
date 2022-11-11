const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
require("dotenv").config();
require("express-async-errors");
const app = express();

const server = app.listen(process.env.PORT, () => {
  console.log(`ELGEMO listening at port ${process.env.PORT}`);
});

const io = require("socket.io")(server);
require("./socket/socket")(io);

app.use(express.json());
app.use(cors());
dbConnect();


app.get("/", (req, res) => {
  res.send("ELGEMO API running...");
});
