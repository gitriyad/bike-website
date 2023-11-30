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
Router.post("/addBike/:edit/:bikeId", userController.postAddBike);
Router.get("/unpublishedBike", userController.getUnpublishedBike);
Router.get("/editBike/:bikeId", userController.getEditBike);
Router.get(
  "/removeImageFromServer/:imageName/:bikeId",
  userController.getRemoveImageFromServer
);
Router.get(
  "/removeTagFromServer/:bikeId/:index",
  userController.getRemoveTagFromServer
);

//exporting Router
module.exports = Router;
