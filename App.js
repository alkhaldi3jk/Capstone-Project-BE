const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/database");
const path = require("path");
const passport = require("passport");
connectDB();
const userRoutes = require("./apis/user/routes");
const serviceRoutes = require("./apis/service/routes")
const app = express();
const ProfileRoutes= require("./apis/profiles/profile.routes")
// Middleware

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

// Passport
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/api", userRoutes);
app.use("/api", serviceRoutes);
app.use("/api/profile",ProfileRoutes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);


app.listen(8080, () => {
    console.log("The application is running on localhost:8080");
  });
