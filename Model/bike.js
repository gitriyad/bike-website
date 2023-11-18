// Reqruired Packages
let mongoose = require("mongoose");

// using packages
let Schema = mongoose.Schema;
let bikeSchema = new Schema({
  bikeName: {
    type: String,
    default: "N/A",
  },
  brand: {
    type: String,
    default: "N/A",
  },
  cc: {
    type: Number,
    default: 0,
  },
  regPrice: {
    type: Number,
    default: 0,
  },
  offPrice: {
    type: Number,
    default: 0,
  },
  bikeType: {
    type: String,
    default: "N/A",
  },
  distributor: {
    type: String,
    default: "N/A",
  },
  modelYear: {
    type: Number,
    default: 0,
  },
  brandOrigin: {
    type: String,
    default: "N/A",
  },
  assembledIn: {
    type: String,
    default: "N/A",
  },
  availableColorsArr: [],
  engineTypeArr: [],
  disPlacement: {
    type: String,
    default: "N/A",
  },
  maxPowerValue: {
    type: Number,
    default: 0,
  },
  maxPowerUnit: {
    type: String,
    default: "N/A",
  },
  maxTorqueValue: {
    type: Number,
    default: 0,
  },
  maxTorqueUnit: {
    type: String,
    default: "N/A",
  },
  boreValue: {
    type: Number,
    default: 0,
  },
  boreUnit: {
    type: String,
    default: "N/A",
  },
  strokeValue: {
    type: Number,
    default: 0,
  },
  strokeUnit: {
    type: String,
    default: "N/A",
  },
  compressRation: {
    type: String,
    default: "N/A",
  },
  valves: {
    type: Number,
    default: 0,
  },
  fuelSupply: {
    type: String,
    default: "N/A",
  },
  noOfCylender: {
    type: Number,
    default: 0,
  },
  engineCool: {
    type: String,
    default: "N/A",
  },
  startMethodArr: [],
  transmissionType: {
    type: String,
    default: "N/A",
  },
  noOfGear: {
    type: Number,
    default: 0,
  },
  clutchTypeArr: [],
  driveType: {
    type: String,
    default: "N/A",
  },
  mileageValue: {
    type: Number,
    default: 0,
  },
  mileageUnit: {
    type: String,
    default: "N/A",
  },
  topSpeedValue: {
    type: Number,
    default: 0,
  },
  topSpeedUnit: {
    type: String,
    default: "N/A",
  },
  chassisType: {
    type: String,
    default: "N/A",
  },
  frontSuspension: {
    type: String,
    default: "N/A",
  },
  rearSuspension: {
    type: String,
    default: "N/A",
  },
  frontBrake: {
    type: String,
    default: "N/A",
  },
  rearBrake: {
    type: String,
    default: "N/A",
  },
  abs: {
    type: String,
    default: "N/A",
  },
  frontTireSizeValue: {
    type: Number,
    default: 0,
  },
  frontTireSizeUnit: {
    type: String,
    default: "N/A",
  },
  rearTireSizeValue: {
    type: Number,
    default: 0,
  },
  rearTireSizeUnit: {
    type: String,
    default: "N/A",
  },
  tireType: {
    type: String,
    default: "N/A",
  },
  wheelType: {
    type: String,
    default: "N/A",
  },
  overallLengthValue: {
    type: Number,
    default: 0,
  },
  overallLengthUnit: {
    type: String,
    default: "N/A",
  },
  overallWidthValue: {
    type: Number,
    default: 0,
  },
  overallWidthUnit: {
    type: String,
    default: "N/A",
  },
  heightValue: {
    type: Number,
    default: 0,
  },
  heightUnit: {
    type: String,
    default: "N/A",
  },
  groundClearanceValue: {
    type: Number,
    default: 0,
  },
  groundClearanceUnit: {
    type: String,
    default: "N/A",
  },
  weightValue: {
    type: Number,
    default: 0,
  },
  weightUnit: {
    type: String,
    default: "N/A",
  },
  fuleTankCapacityValue: {
    type: Number,
    default: 0,
  },
  fuleTankCapacityUnit: {
    type: String,
    default: "N/A",
  },
  wheelBaseValue: {
    type: Number,
    default: 0,
  },
  wheelBaseUnit: {
    type: String,
    default: "N/A",
  },
  seatHeightValue: {
    type: Number,
    default: 0,
  },
  seatHeightUnit: {
    type: String,
    default: "N/A",
  },
  batVoltage: {
    type: String,
    default: "N/A",
  },
  headLight: {
    type: String,
    default: "N/A",
  },
  tailLight: {
    type: String,
    default: "N/A",
  },
  indicator: {
    type: String,
    default: "N/A",
  },
  speedoMeter: {
    type: String,
    default: "N/A",
  },
  odoMeter: {
    type: String,
    default: "N/A",
  },
  rpmMeter: {
    type: String,
    default: "N/A",
  },
  handleType: {
    type: String,
    default: "N/A",
  },
  seatType: {
    type: String,
    default: "N/A",
  },
  passengerGrabRail: {
    type: String,
    default: "N/A",
  },
  engineKillSwitch: {
    type: String,
    default: "N/A",
  },
  imageArr: [],
  status: {
    type: String,
    default: "Unpublished",
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  additionalFeatureArr: [],
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Bike", bikeSchema);
