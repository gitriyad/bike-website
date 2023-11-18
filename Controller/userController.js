// require packages
let formidable = require("formidable");
let fs = require("fs");
let path = require("path");
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
  res.render("user/addBike");
};
exports.postAddBike = (req, res, next) => {
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
    })
    .then(({ bike, images }) => {
      res.send("Successfull");
      let rootPath = path.join(rootDir, "public", "upload", "brand");
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
