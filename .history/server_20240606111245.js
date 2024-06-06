const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const port = 3000;

// Kết nối các routes
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const viewRoutes = require("./routes/viewRoutes");

// Sử dụng express-session middleware
app.use(
  session({
    secret: "KHONGCHOXEM",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/tracks", trackRoutes);
app.use("/", viewRoutes);
app.use("/spotify", spotifyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
