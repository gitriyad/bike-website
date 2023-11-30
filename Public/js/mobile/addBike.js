function addBikeJS(container) {}

function tagHandler(input, e, edit = false) {
  edit = edit == "true";
  let tagContainer = input.previousElementSibling;
  if (e.key == "Enter") {
    e.preventDefault();
    let inputValue = input.value;
    let tag = document.createElement("div");
    tag.setAttribute("class", "tag");
    if (edit) {
      tag.classList.add("updateTag");
    }
    tag.innerHTML = `${inputValue}<span class="removeTag" onclick="removeTag(this)">X</span>`;
    tagContainer.appendChild(tag);
    input.value = "";
  }
}
function removeTag(child) {
  return child.parentNode.remove();
}
function removeTagFromServer(childElement, index, bikeId) {
  let isRemove = confirm("Do You Want to Remove This Tag?");
  if (isRemove) {
    fetch(`/removeTagFromServer/${bikeId}/${index}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn't remove");
        }
        return response.text();
      })
      .then((data) => {
        alert(data);
        childElement.parentNode.remove();
      })
      .catch((err) => {
        alert(`Tag Remove Failed: ${err.message}`);
      });
  }
}
function addAdditionalFeature(checkBox, event) {
  let table = document.querySelector(".addBikeTable>tbody");
  if (checkBox.checked) {
    let trContent = `
            <th >Additional Features
            </th>
            <td>
            <div class="flexTd">
            <div class="addFeaDiv tagContainer"></div>
              <input
                type="text"
                class="addFeaValue tagInput"
                onkeydown="tagHandler(this,event)"
                placeholder="Enter Features Tags"
              />
            </div>
            </td>`;
    let tr = document.createElement("tr");
    tr.setAttribute("class", "addFeaTr");
    tr.innerHTML = trContent;
    table.appendChild(tr);
  } else {
    let lastTr = document.querySelector(".lastTr");
    let addedFeaTr = lastTr.nextElementSibling;
    if (addedFeaTr) {
      let remove = window.confirm(
        "Do You Want to Delete This Additional Features?\nYou will Loose All The Added Features"
      );
      if (remove) {
        addedFeaTr.remove();
      } else {
        checkBox.checked = true;
      }
    } else {
      checkBox.checked = true;
    }
  }
}

function handleImages(event, edit = false) {
  let imageContainer = document.querySelector(".imagesViewArea");
  let images = [...event.target.files];
  images.forEach((image, index) => {
    let reader = new FileReader();
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "bikeImg");
    reader.onload = (e) => {
      imgDiv.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(image);
    imgDiv.innerHTML = `<span class="removeImage" onclick="removeImage(this)">X</span>`;
    imgDiv.setAttribute("data-name", image.name);
    if (!edit) {
      imageContainer.innerHTML = "";
    }
    imageContainer.appendChild(imgDiv);
  });
}
function removeImage(image) {
  let imgDiv = image.parentNode;
  let imgName = imgDiv.getAttribute("data-name");
  let imagesFileInput = document.querySelector(".bikeImage");
  let actualImageArr = [...imagesFileInput.files];
  let newImageArr = actualImageArr.filter((img) => img.name != imgName);
  let dataTransfer = new DataTransfer();
  newImageArr.forEach((image) => {
    dataTransfer.items.add(image);
  });
  imagesFileInput.files = dataTransfer.files;
  image.parentNode.remove();
}
// remove image from server
function removeImageFromServer(childElement, imageName, bikeId) {
  let isRemove = confirm("Do you want to delete this image?");
  if (isRemove) {
    fetch(`/removeImageFromServer/${imageName}/${bikeId}`, {
      method: "GET",
    })
      .then((respose) => {
        if (!respose.ok) {
          throw new Error("Data Not Deleted");
        }
        return respose.text();
      })
      .then((data) => {
        alert(data);
        childElement.parentNode.remove();
      })
      .catch((err) => {
        alert(`error: ${err.message}`);
      });
  } else {
    return;
  }
}
function dataHolderCollect() {
  let user = document.querySelector(".save");
  let bikeName = document.querySelector(".bikeName");
  let brand = document.querySelector(".brand");
  let cc = document.querySelector(".cc");
  let regPrice = document.querySelector(".regPrice");
  let offPrice = document.querySelector(".offPrice");
  let bikeType = document.querySelector(".bikeType");
  let distributor = document.querySelector(".dist");
  let modelYear = document.querySelector(".modYear");
  let brandOrigin = document.querySelector(".brandOrigin");
  let assembledIn = document.querySelector(".assIn");
  let disPlacement = document.querySelector(".disp");
  let maxPowerValue = document.querySelector(".maxPowValue");
  let maxPowerUnit = document.querySelector(".maxPowUnit");
  let maxTorqValue = document.querySelector(".maxTorqValue");
  let maxTorqUnit = document.querySelector(".maxTorqUnit");
  let boreValue = document.querySelector(".boreValue");
  let boreUnit = document.querySelector(".boreUnit");
  let strokeValue = document.querySelector(".strokeValue");
  let strokeUnit = document.querySelector(".strokeUnit");
  let compressRation = document.querySelector(".compR");
  let valves = document.querySelector(".valves");
  let fuelSupply = document.querySelector(".fSup");
  let noOfCylender = document.querySelector(".nOCyl");
  let engineCool = document.querySelector(".engCool");
  let transmissionType = document.querySelector(".tt");
  let noOfGear = document.querySelector(".nG");
  let driveType = document.querySelector(".dT");
  let mileageValue = document.querySelector(".milValue");
  let mileageUnit = document.querySelector(".milUnit");
  let topSpeedValue = document.querySelector(".tSpeedValue");
  let topSpeedUnit = document.querySelector(".tSpeedUnit");
  let chassisType = document.querySelector(".chT");
  let frontSuspension = document.querySelector(".fS");
  let rearSuspension = document.querySelector(".rS");
  let frontBrake = document.querySelector(".frBT");
  let rearBrake = document.querySelector(".rrBT");
  let breakingSys = document.querySelector(".brSys");
  let abs = document.querySelector(".abs");
  let frontTireSizeValue = document.querySelector(".frTireSizeValue");
  let frontTireSizeUnit = document.querySelector(".frTireSizeUnit");
  let rearTireSizeValue = document.querySelector(".rrTireSizeValue");
  let rearTireSizeUnit = document.querySelector(".rrTireSizeUnit");
  let tireType = document.querySelector(".tireType");
  let wheelType = document.querySelector(".wt");
  let overallLengthValue = document.querySelector(".ovAllLengthValue");
  let overallLengthUnit = document.querySelector(".ovAllLengthUnit");
  let overallWidthValue = document.querySelector(".ovAllWidthValue");
  let overallWidthUnit = document.querySelector(".ovAllWidthUnit");
  let heightValue = document.querySelector(".heightValue");
  let heightUnit = document.querySelector(".heightUnit");
  let groundClearanceValue = document.querySelector(".groundClearValue");
  let groundClearanceUnit = document.querySelector(".groundClearUnit");
  let weightValue = document.querySelector(".weightValue");
  let weightUnit = document.querySelector(".weightUnit");
  let fuleTankCapacityValue = document.querySelector(".fuelTankCapValue");
  let fuleTankCapacityUnit = document.querySelector(".fuelTankCapUnit");
  let wheelBaseValue = document.querySelector(".wheelBaseValue");
  let wheelBaseUnit = document.querySelector(".wheelBaseUnit");
  let seatHeightValue = document.querySelector(".seatHeightValue");
  let seatHeightUnit = document.querySelector(".seatHeightUnit");
  let batVoltage = document.querySelector(".batV");
  let headLight = document.querySelector(".headL");
  let tailLight = document.querySelector(".tailL");
  let indicator = document.querySelector(".ind");
  let speedoMeter = document.querySelector(".speedMet");
  let odoMeter = document.querySelector(".odoMet");
  let rpmMeter = document.querySelector(".rpmMet");
  let handleType = document.querySelector(".handType");
  let seatType = document.querySelector(".seatTyp");
  let passengerGrabRail = document.querySelector(".passGRail");
  let engineKillSwitch = document.querySelector(".engKS");

  let engineTypeTagContainer = document.querySelector(
    ".engineType.tagContainer"
  );
  let additionalFeatureTagContainer = document.querySelector(
    ".addFeaDiv.tagContainer"
  );
  let availableColorsTagContainer = document.querySelector(
    ".avColorsDiv.tagContainer"
  );
  let startingMethodTagContainer = document.querySelector(
    ".startM.tagContainer"
  );
  let clutchTypeTagContainer = document.querySelector(".cT.tagContainer");
  let engineTypeArr = extracData(engineTypeTagContainer);
  let additionalFeatureArr = extracData(additionalFeatureTagContainer);
  let availableColorsArr = extracData(availableColorsTagContainer);
  let startMethodArr = extracData(startingMethodTagContainer);
  let clutchTypeArr = extracData(clutchTypeTagContainer);
  let imageInput = document.querySelector(".bikeImage");
  let imageArr = imageInput.files;
  let data = {
    user: user,
    bikeName: bikeName,
    brand: brand,
    cc: cc,
    regPrice: regPrice,
    offPrice: offPrice,
    bikeType: bikeType,
    distributor: distributor,
    modelYear: modelYear,
    brandOrigin: brandOrigin,
    assembledIn: assembledIn,
    availableColorsArr: availableColorsArr,
    engineTypeArr: engineTypeArr,
    disPlacement: disPlacement,
    maxPowerValue: maxPowerValue,
    maxPowerUnit: maxPowerUnit,
    maxTorqueValue: maxTorqValue,
    maxTorqueUnit: maxTorqUnit,
    boreValue: boreValue,
    boreUnit: boreUnit,
    strokeValue: strokeValue,
    strokeUnit: strokeUnit,
    compressRation: compressRation,
    valves: valves,
    fuelSupply: fuelSupply,
    noOfCylender: noOfCylender,
    engineCool: engineCool,
    startMethodArr: startMethodArr,
    transmissionType: transmissionType,
    noOfGear: noOfGear,
    clutchTypeArr: clutchTypeArr,
    driveType: driveType,
    mileageValue: mileageValue,
    mileageUnit: mileageUnit,
    topSpeedValue: topSpeedValue,
    topSpeedUnit: topSpeedUnit,
    chassisType: chassisType,
    frontSuspension: frontSuspension,
    rearSuspension: rearSuspension,
    frontBrake: frontBrake,
    rearBrake: rearBrake,
    breakingSys: breakingSys,
    abs: abs,
    frontTireSizeValue: frontTireSizeValue,
    frontTireSizeUnit: frontTireSizeUnit,
    rearTireSizeValue: rearTireSizeValue,
    rearTireSizeUnit: rearTireSizeUnit,
    tireType: tireType,
    wheelType: wheelType,
    overallLengthValue: overallLengthValue,
    overallLengthUnit: overallLengthUnit,
    overallWidthValue: overallWidthValue,
    overallWidthUnit: overallWidthUnit,
    heightValue: heightValue,
    heightUnit: heightUnit,
    groundClearanceValue: groundClearanceValue,
    groundClearanceUnit: groundClearanceUnit,
    weightValue: weightValue,
    weightUnit: weightUnit,
    fuleTankCapacityValue: fuleTankCapacityValue,
    fuleTankCapacityUnit: fuleTankCapacityUnit,
    wheelBaseValue: wheelBaseValue,
    wheelBaseUnit: wheelBaseUnit,
    seatHeightValue: seatHeightValue,
    seatHeightUnit: seatHeightUnit,
    batVoltage: batVoltage,
    headLight: headLight,
    tailLight: tailLight,
    indicator: indicator,
    speedoMeter: speedoMeter,
    odoMeter: odoMeter,
    rpmMeter: rpmMeter,
    handleType: handleType,
    seatType: seatType,
    passengerGrabRail: passengerGrabRail,
    engineKillSwitch: engineKillSwitch,
    imageArr: imageArr,
    additionalFeatureArr: additionalFeatureArr,
  };
  return data;
}
function extracData(tagContainer) {
  if (tagContainer) {
    if (tagContainer.childElementCount > 0) {
      let arr = [];
      let tags = [...tagContainer.querySelectorAll(".tag")];
      tags.forEach((tag) => {
        let regex = /([^<]*)<span class="removeTag"/gm;
        let match = regex.exec(tag.innerHTML);
        if (match && match[1]) {
          let text = match[1].trim();
          arr.push(text);
        }
      });
      return arr;
    } else {
      return [];
    }
  } else {
    return [];
  }
}
function dataCollect(obj) {
  let data = {};
  Object.keys(obj).forEach((key) => {
    if (
      key == "engineTypeArr" ||
      key == "imageArr" ||
      key == "additionalFeatureArr" ||
      key == "availableColorsArr" ||
      key == "startMethodArr" ||
      key == "clutchTypeArr"
    ) {
      data[key] = obj[key];
    } else if (
      key == "cc" ||
      key == "regPrice" ||
      key == "offPrice" ||
      key == "modelYear" ||
      key == "maxPowerValue" ||
      key == "maxTorqueValue" ||
      key == "boreValue" ||
      key == "strokeValue" ||
      key == "valves" ||
      key == "noOfCylender" ||
      key == "noOfGear" ||
      key == "mileageValue" ||
      key == "topSpeedValue" ||
      key == "frontTireSizeValue" ||
      key == "rearTireSizeValue" ||
      key == "overallLengthValue" ||
      key == "overallWidthValue" ||
      key == "heightValue" ||
      key == "groundClearanceValue" ||
      key == "weightValue" ||
      key == "fuleTankCapacityValue" ||
      key == "wheelBaseValue" ||
      key == "seatHeightValue"
    ) {
      data[key] = Number(obj[key].value.trim());
    } else if (key == "user") {
      data["uploadedBy"] = obj[key].getAttribute("data-user").trim();
    } else {
      data[key] = obj[key].value.trim();
    }
  });
  return data;
}

function saveData(edit = false, id = false) {
  edit = edit == "true";
  let dataHolder = dataHolderCollect();
  let data = dataCollect(dataHolder);
  uploadData(`/addBike/${edit}/${id}`, data, (err, res) => {
    if (err) {
      alert(`Error in Uploading Data: ${err}`);
    } else {
      alert(`Data Upload: ${res}`);
    }
  });
}
function uploadData(url, data, cb) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (
      key == "engineTypeArr" ||
      key == "imageArr" ||
      key == "additionalFeatureArr" ||
      key == "availableColorsArr" ||
      key == "startMethodArr" ||
      key == "clutchTypeArr"
    ) {
      [...data[key]].forEach((dataKey) => {
        formData.append(`${key}`, dataKey);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Bike Upload Failed. Status ${response.status}, reason: ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((data) => {
      cb(null, data);
    })
    .catch((err) => {
      cb(err, null);
    });
}
