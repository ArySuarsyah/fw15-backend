/* eslint-disable no-undef */
const { Pool } = require("pg"); // untuk membuat koneksi pada database

const connectionString =
  "postgresql://postgres:1@localhost:5432/postgres?schema=public";

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
