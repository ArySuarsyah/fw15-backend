/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const app = express();



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./src/routes"));

require("dotenv").config({
  path: ".env",
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
