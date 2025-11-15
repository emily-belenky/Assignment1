const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// connect to mongo
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.error("mongo connection error:", err));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const postsRoute = require("./routes/posts_route");
// comments route will be added later by Dotan

app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("Assignment1 API is running");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
