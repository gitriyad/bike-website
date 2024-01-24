// require packages
let formidable = require("formidable");
// let fs = require("fs");
let fs = require("@cyclic.sh/s3fs")(S3_BUCKET_NAME);
let path = require("path");
let mongoose = require("mongoose");
let rootDir = require("../Utility/root");
// Importing Models
let Bike = require("../Model/bike");
let Filter = require("../Model/filter");
// Controller Handller
exports.getUserIndex = (req, res, next) => {
  res.render("user/index");
};
exports.getDashboard = (req, res, next) => {
  let admin = req.params.admin == "true";
  if (admin) {
    res.render("admin/dashboard");
  } else {
    res.render("user/dashboard");
  }
};
exports.getAddBike = (req, res, next) => {
  res.render("user/addBike", {
    edit: false,
  });
};
exports.postAddBike = async (req, res, next) => {
  let edit = req.params.edit == "true";
  let bikeId = req.params.bikeId;
  let upBike = {};
  if (edit) {
    try {
      let bk = await Bike.findOne({ _id: bikeId });
      if (bk) {
        upBike = bk;
      } else {
        throw new Error("No bike found");
      }
    } catch (findBikeError) {
      res.send(findBikeError.message);
    }
  }
  let form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        let bike = {};
        bike.imageArr = [];
        let images = [];
        Object.keys(fields).forEach((fieldKey) => {
          if (
            fieldKey == "engineTypeArr" ||
            fieldKey == "imageArr" ||
            fieldKey == "additionalFeatureArr" ||
            fieldKey == "availableColorsArr" ||
            fieldKey == "startMethodArr" ||
            fieldKey == "clutchTypeArr"
          ) {
            bike[fieldKey] = fields[fieldKey];
          } else {
            let isNum = parseInt(fields[fieldKey][0], 10);
            if (
              !isNaN(isNum) &&
              Number.isInteger(isNum) &&
              isNum.toString() == fields[fieldKey][0]
            ) {
              bike[fieldKey] = isNum;
            } else {
              bike[fieldKey] = fields[fieldKey][0];
            }
          }
        });
        if (edit) {
          bike.imageArr.push(...upBike.imageArr);
        }
        if (files.imageArr) {
          files.imageArr.forEach((img) => {
            bike.imageArr.push(img.originalFilename);
            images.push({
              fileName: img.originalFilename,
              filePath: img.filepath,
            });
          });
        }
        resolve({ bike, images });
      }
    });
  })
    .then(({ bike, images }) => {
      if (edit) {
        return new Promise((resolve, reject) => {
          Bike.updateOne({ _id: bikeId }, bike)
            .then((result) => {
              resolve({ bike, images });
            })
            .catch((upError) => {
              reject(new Error(`Error updating ${upError.message}`));
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          let newBike = new Bike(bike);
          newBike
            .save()
            .then((res) => {
              resolve({ bike, images });
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    })
    .then(({ bike, images }) => {
      res.send("Successfull");
      let rootPath = path.join(rootDir, "Public", "upload", "brand");
      let newPath = path.join(bike.brand, bike.bikeName, "images");
      makeFolders(rootPath, newPath);
      images.forEach((img) => {
        let uploadDir = path.join(rootPath, newPath, img.fileName);
        let image = fs.readFileSync(img.filePath);
        fs.writeFileSync(uploadDir, image);
      });
      return bike;
    })
    .then((bike) => {
      let filterProps = Object.keys(Filter.schema.paths);
      Filter.find({}).then((filterArr) => {
        if (filterArr[0]) {
          filterProps.forEach((key) => {
            if (bike[key]) {
              if (Array.isArray(bike[key])) {
                filterArr[0][key].push(...bike[key]);
                filterArr[0][key] = [...new Set(filterArr[0][key])];
              } else {
                filterArr[0][key].push(bike[key]);
                filterArr[0][key] = [...new Set(filterArr[0][key])];
              }
            }
          });
          filterArr[0].save();
        } else {
          let filter = {};
          filterProps.forEach((key) => {
            if (bike[key]) {
              if (Array.isArray(bike[key])) {
                filter[key] = bike[key];
              } else {
                filter[key] = [bike[key]];
              }
            }
          });
          let newFilter = new Filter(filter);
          newFilter.save();
        }
      });
    })
    .catch((er) => {
      res.send(`Failed: ${er.message}`);
    });
};
exports.getUnpublishedBike = (req, res, next) => {
  Bike.find({ status: "Unpublished" })
    .then((bikes) => {
      if (bikes.length > 0) {
        res.render("user/bikeStatus", {
          status: "Unpublished",
          bikes: bikes,
        });
      } else {
        throw new Error("No Unpublished Bike Found");
      }
    })
    .catch((err) => {
      res.send(`Failed: ${err.message}`);
    });
};
exports.getEditBike = (req, res, next) => {
  Bike.findOne({ _id: req.params.bikeId })
    .then((bike) => {
      if (bike) {
        res.render("user/addBike", {
          edit: true,
          bike: bike,
        });
      } else {
        throw new Error("No Bike Found");
      }
    })
    .catch((err) => {
      res.send(`Failed: ${err.message}`);
    });
};
exports.getRemoveImageFromServer = (req, res, next) => {
  let imageName = req.params.imageName;
  let bikeId = req.params.bikeId;
  Bike.findOne({ _id: bikeId })
    .then((bike) => {
      if (!bike) {
        throw new Error("No bike found");
      }
      return bike;
    })
    .then((bike) => {
      let newImageArr = bike.imageArr.filter((image) => image != imageName);
      bike.imageArr = newImageArr;
      return { bike: bike, imageName: imageName };
    })
    .then(({ bike, imageName }) => {
      let imagePath = path.join(
        rootDir,
        "public",
        "upload",
        "brand",
        bike.brand,
        bike.bikeName,
        "images"
      );
      return new Promise((resolve, reject) => {
        fs.readdir(imagePath, (err, files) => {
          if (err) {
            reject(new Error(`Folder Reading Error ${err.message}`));
          }
          resolve({ bike, files, imageName });
        });
      });
    })
    .then(({ bike, files, imageName }) => {
      let imagePath = path.join(
        rootDir,
        "public",
        "upload",
        "brand",
        bike.brand,
        bike.bikeName,
        "images",
        imageName
      );
      files.forEach((file) => {
        if (file == imageName) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              throw new Error("Image Deleting Error: " + err.message);
            }
          });
        }
      });
      return { bike: bike, resp: "Success" };
    })
    .then(({ bike, resp }) => {
      if (resp != "Success") {
        throw new Error("Image Deleting Error");
      }
      bike.save().then((result) => {
        if (result) {
          res.send("Success");
        } else {
          throw new Error("Image Deleting Failed");
        }
      });
    })
    .catch((err) => {
      res.send(err.message);
    });
};
exports.getRemoveTagFromServer = (req, res, next) => {
  let bikeId = req.params.bikeId;
  let index = req.params.index;
  Bike.findOne({ _id: bikeId })
    .then((bike) => {
      if (!bike) {
        throw new Error("Bike Not Found");
      }
      return bike;
    })
    .then((bike) => {
      bike.additionalFeatureArr.splice(index, 1);
      bike
        .save()
        .then((result) => {
          if (!result) {
            throw new Error("Bike Not Saved");
          } else {
            res.send("Success");
          }
        })
        .catch((err) => {
          throw new Error(`Error In deleting Tag ${err.message}`);
        });
    })
    .catch((err) => {
      res.send("Error In deleting" + err.message);
    });
};

function makeFolders(rootPath, newPath) {
  let folders = newPath.split(path.sep);
  folders.forEach((folder) => {
    let makeFolder = path.join(rootPath, folder);
    if (!fs.existsSync(makeFolder)) {
      fs.mkdirSync(makeFolder);
    }
    rootPath = path.join(rootPath, folder);
  });
}
