//Required Package
let formidable = require("formidable");
let User = require("../Model/user");
let os = require("os");
let path = require("path");
let fs = require("fs");
let bcrypt = require("bcrypt");
let Cookies = require("cookies");
let crypto = require("crypto");
let rootDir = require("../Utility/root");

//Controller methods
exports.getRegister = (req, res, next) => {
  res.render("auth/register");
};
exports.postRegister = (req, res, next) => {
  let netInterface = os.networkInterfaces();
  let mac = "";
  Object.keys(netInterface).forEach((interface) => {
    if (interface == "Wi-Fi") {
      let deviceNetDetails = netInterface[interface];
      mac = deviceNetDetails[0].mac;
    }
  });
  let email = req.params.email;
  if (!email) {
    throw new Error("Can Not Get Email");
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          throw new Error("User Already Registered");
        } else {
          let form = new formidable.IncomingForm({
            multiples: true,
            keepExtensions: true,
          });
          return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
              if (err) {
                reject(err);
              } else {
                let name = fields.name[0];
                let email = fields.email[0];
                let password = fields.password[0];
                let photoPath = files.photo[0].filepath;
                let photoName = files.photo[0].originalFilename;
                resolve({
                  name: name,
                  email: email,
                  password: password,
                  photoPath: photoPath,
                  photoName: photoName,
                });
              }
            });
          });
        }
      })
      .then((formData) => {
        let uploadDir = path.join(rootDir, "public", "upload", formData.email);
        try {
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
        } catch (er) {
          throw er;
        }
        let image = fs.readFileSync(formData.photoPath);
        let imageUploadPath = path.join(uploadDir, formData.photoName);
        fs.writeFileSync(imageUploadPath, image);
        let user = new User({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mac: mac,
          photo: formData.photoName,
          token: "",
        });
        user
          .save()
          .then((savedUser) => {
            res.send("Registration Successfull");
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
};
exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};
exports.postLogin = (req, res, next) => {
  let cookies = new Cookies(req, res);
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("User Not Found");
      } else {
        let hasPassword = user.password;
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, hasPassword, (err, result) => {
            if (err) {
              reject(new Error("Password or Email Is not Correct"));
            } else {
              resolve({ user, result });
            }
          });
        });
      }
    })
    .then(({ user, result }) => {
      if (!result) {
        throw new Error("Password or Email Is not Correct");
      } else {
        let riderToken = crypto.randomBytes(32).toString("hex");
        let maxAge = new Date();
        maxAge.setFullYear(maxAge.getFullYear() + 15);
        cookies.set("RT", riderToken, { expires: maxAge, httpOnly: true });
        user.token = riderToken;
        return user.save().then((savedUser) => {
          return savedUser;
        });
      }
    })
    .then((user) => {
      req.user = user;
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.send("success");
    })
    .catch((er) => {
      console.log("er", er);
    });
};
