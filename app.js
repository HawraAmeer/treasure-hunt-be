const express = require("express");
const db = require("./db/models");
const thingRoutes = require("./routes/things");
const userRoutes = require("./routes/users");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);
app.use(thingRoutes);

app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found." });
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error!" });
});

db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
