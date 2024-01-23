//Requiring packages

let express = require("express");
let mongoose = require("mongoose");
let app = express();
let path = require("path");
let envVariable = require("./config/env");
let session = require("express-session");
let mongodbStore = require("connect-mongodb-session")(session);
let PORT = process.env.PORT || 3000;

//main file path

let rootDir = require("./Utility/root");

//database session store

let store = new mongodbStore({
  uri: envVariable.connectionString,
  collection: "sessions",
});

//Importing Routes
let userRoute = require("./Routes/userRoute");
let authRoute = require("./Routes/authRoute");
let adminRoute = require("./Routes/adminRoute");

// Importing Middleware
let middleware = require("./middleware/middleware");

//global execution
// ...

// Custom middleware to set Content-Type for JavaScript files
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "Views", "View"));
app.use(
  express.static(path.join(rootDir, "Public"), {
    setHeaders: (res, path, stat) => {
      let fileExtension = path.split(".").pop();
      // Set Content-Type based on the file extension
      if (fileExtension == "js") {
        res.setHeader("Content-Type", "text/javascript");
      } else if (fileExtension == "css") {
        res.setHeader("Content-Type", "text/css");
      }
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Cache-Control", "no-store");
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: envVariable.secretKey,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//Rendering middlewares
// app.use(middleware.setHeaders);
app.use(middleware.getUser(app));
app.use(middleware.setLocalsVariable(app));
//Rendering Routes
app.use(userRoute);
app.use(authRoute);

//Connecting to Database
mongoose
  .connect(envVariable.connectionString)
  .then((res) => {
    console.log("Database Connected");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("Database Connection Error");
  });
