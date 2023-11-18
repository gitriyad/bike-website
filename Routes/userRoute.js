//Required packages

let express = require("express");
let Router = express.Router();

//get Controllers
let userController = require("../Controller/userController");
let authController = require("../Controller/authController");

//Handle Routes
Router.get("/", userController.getUserIndex);
Router.get("/dashboard/:admin", userController.getDashboard);
Router.get("/addBike", userController.getAddBike);
Router.post("/addBike", userController.postAddBike);

//exporting Router
module.exports = Router;
