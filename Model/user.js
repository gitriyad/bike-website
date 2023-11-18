// Require packages
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
//using packages
let Schema = mongoose.Schema;
let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastActivity: {
    type: String,
    default: Date.now(),
  },
  mac: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  photo: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// Encrypt Only Password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  let salt = await bcrypt.genSalt(10);
  let encryptedPassword = await bcrypt.hash(this.password, salt);
  this.password = encryptedPassword;
  next();
});
module.exports = mongoose.model("User", userSchema);
