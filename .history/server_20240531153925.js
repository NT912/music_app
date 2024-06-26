const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Kết nối các routes
const authRoutes = require("./app/routes/authRoutes");
const trackRoutes = require("./app/routes/trackRoutes");
const viewRoutes = require("./app/routes/viewRoutes");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/tracks", trackRoutes);
app.use("/", viewRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
