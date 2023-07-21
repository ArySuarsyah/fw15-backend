require("dotenv").config({
  path: ".env",
});
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: false }));
app.use("/", require("./src/routes"));


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});


// require("dotenv").config({
//   path: ".env",
// });
// /* eslint-disable no-undef */
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use("/", require("./src/routes"));

// const PORT = process.env.PORT;


// io.on("connection", (socket) => {
//   console.log("Klien terhubung");

//   socket.on("pesan", (data) => {
//     console.log("Pesan diterima:", data);
//   });

// });

// http.listen(PORT, () => {
//   console.log(`App running on ${PORT}`);
// });
