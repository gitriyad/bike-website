//importing required modules
let os = require("os");
let Cookies = require("cookies");
//importing models
let User = require("../Model/user");

// Middlewares
exports.setHeaders = (req, res, next) => {
  let url = req.url;
  if (url.endsWith(".js")) {
    res.setHeader("Content-Type", "text/javascript");
    console.log("url", url);
  } else if (url.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }
  console.log("url", url);
  next();
};

exports.getUser = (app) => (req, res, next) => {
  // let netInterface = os.networkInterfaces();
  // let mac = "";
  // Object.keys(netInterface).forEach((interface) => {
  //   console.log("interface", interface);
  //   if (interface == "Wi-Fi") {
  //     let deviceNetDetails = netInterface[interface];
  //     mac = deviceNetDetails[0].mac;
  //   }
  // });
  let cookies = new Cookies(req, res);
  let token = cookies.get("RT");
  return User.findOne({ token: token }).then((user) => {
    if (user) {
      req.user = user;
      req.session.user = user;
      req.session.isLoggedIn = true;
      // app.locals.isLoggedIn = req.session.isLoggedIn;
      // app.locals.admin = req.session.user.admin;
      // app.locals.user = req.session.user._id;
      next();
    } else {
      req.session.isLoggedIn = false;
      // app.locals.isLoggedIn = req.session.isLoggedIn;
      // app.locals.admin = false;
      // app.locals.user = false;
      console.log("user not login");
      next();
    }
  });
};
exports.setLocalsVariable = (app) => (req, res, next) => {
  if (req.session.isLoggedIn) {
    app.locals.isLoggedIn = req.session.isLoggedIn;
    app.locals.admin = req.session.user.admin;
    app.locals.user = req.session.user._id;
    next();
  } else {
    req.session.isLoggedIn = false;
    app.locals.isLoggedIn = req.session.isLoggedIn;
    app.locals.admin = false;
    app.locals.user = false;
    next();
  }
};
