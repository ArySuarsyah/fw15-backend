/* eslint-disable no-undef */

require("dotenv").config({
  path: ".env",
});
const { Pool } = require("pg"); // untuk membuat koneksi pada database

const connectionString = process.env.DATABASE;

const db = new Pool({
  connectionString,
});

db.connect().then(() => {
  console.log("Database connected!")
}).catch((err) => {
  console.log(err);
  console.log("Failed to connect to database!");
})

module.exports = db;
