//Required packages

let express = require("express");
let Router = express.Router();

//get Controllers
let userController = require("../Controller/userController");
let authController = require("../Controller/authController");

//Handle Routes
Router.get("/register", authController.getRegister);
Router.post("/register/:email", authController.postRegister);
Router.get("/login", authController.getLogin);
Router.post("/login", authController.postLogin);

//exporting Router
module.exports = Router;
