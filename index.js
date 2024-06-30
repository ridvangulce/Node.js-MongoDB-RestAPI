const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database.js");
const Auth = require("./routes/auth.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Register
app.use("/", Auth);

app.get("/", (req, res) => {
  res.json({ message: "deneme deneme" });
});

const PORT = process.env.PORT;

database();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
