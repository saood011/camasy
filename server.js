const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routers/api/users");
const students = require("./routers/api/student");
const room = require("./routers/api/room");
const profile = require("./routers/api/profile");
const projects = require("./routers/api/projects");
const staff = require("./routers/api/staff");
const inventory = require("./routers/api/inventory");
const path = require("path");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db =
  " mongodb+srv://saood-data:1234@cluster0-p1lze.mongodb.net/test?retryWrites=true&w=majority";

// connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/projects", projects);
app.use("/api/student", students);
app.use("/api/room", room);
app.use("/api/staff", staff);
app.use("/api/inventory", inventory);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
