const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import routes
const doctorsRoutes = require("./routes/doctorsRoutes");
const authController = require("./controllers/authController");

app.use("/api", doctorsRoutes);

app.post("/register", authController.registerUser);
app.post("/login", authController.loginUser);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
