let subBtn = document.querySelector(".subBtn");
let notification = document.querySelector(".notification");
notification.style.color = "red";
subBtn.addEventListener("click", (e) => {
  notification.innerText = "";
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");
  let isValid = checkValidity(email, password);
  if (isValid) {
    let sendObj = JSON.stringify({
      email: email.value.trim(),
      password: password.value.trim(),
    });
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    fetch("/login", {
      method: "POST",
      body: sendObj,
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed To Fetch User");
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data == "success") {
          window.location.href = "/";
        } else {
          notification.innerText = data;
        }
      })
      .catch((err) => {
        notification.innerText = err;
      });
  }
});
function checkValidity(email, password) {
  if (!email.value) {
    notification.innerText = "Enter Valid Email";
    return false;
  }
  if (!password.value) {
    notification.innerText = "Enter Valid Password";
    return false;
  }
  return true;
}
