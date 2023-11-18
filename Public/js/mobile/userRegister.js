//image preview
let photoFile = document.querySelector(".userPhoto");
let previewDiv = document.querySelector(".userImageArea");
photoFile.addEventListener("change", (e) => {
  console.log("input change");
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = (url) => {
      let imageUrl = url.target.result;
      previewDiv.style.backgroundImage = `url(${imageUrl})`;
    };
    reader.readAsDataURL(file);
  } else {
    previewDiv.style.backgroundImage = `url(/Photos/blankProfile/blankProfile.jpg)`;
  }
});

//Data Sending Process
let submitBtn = document.querySelector(".subBtn");
submitBtn.addEventListener("click", (e) => {
  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");
  let cnfPassword = document.querySelector(".cnfPassword");
  let photo = document.querySelector(".userPhoto").files[0];
  let isValid = checkValidity(name, email, password, cnfPassword, photo);
  if (isValid) {
    let formData = new FormData();
    formData.append("name", name.value.trim());
    formData.append("email", email.value.trim());
    formData.append("password", password.value.trim());
    formData.append("photo", photo);
    fetch(`/register/${email.value.trim()}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.text();
      })
      .then((data) => {
        if (data == "Registration Successfull") {
          alert("Registration Successfull");
          window.location.href = "/login";
        } else {
          alert(data);
        }
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }
});
// validity check
function checkValidity(name, email, password, cnfPassword, photo) {
  let regex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  if (
    name.value == "" ||
    name.value == " " ||
    name.value == null ||
    name.value == undefined ||
    !name.value
  ) {
    name.placeholder = "Name is Required";
    name.style.color = "red";
    return false;
  } else {
    name.style.color = "black";
  }
  if (!regex.test(email.value)) {
    email.placeholder = "Enter a valid email address";
    email.style.color = "red";
    return false;
  } else {
    email.style.color = "black";
  }
  if (
    password.value == "" ||
    password.value == " " ||
    password.value == null ||
    password.value == undefined ||
    !password.value ||
    password.value != cnfPassword.value
  ) {
    password.placeholder = "Password is not matching";
    password.style.color = "red";
    return false;
  } else {
    password.style.color = "black";
  }
  if (!photo) {
    alert("Photo is Required");
    return false;
  }
  return true;
}
