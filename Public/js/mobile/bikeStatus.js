let unPubviewArea = document.querySelector(".viewArea");
let overlay = document.querySelector(".overlay");
let overlayIcon = document.querySelector(".overlayIcon");
function fetchReq(btn) {
  overlay.style.display = "flex";
  overlay.style.opacity = "1";
  let url = btn.getAttribute("data-url");
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed To Fetch");
      } else {
        return response.text();
      }
    })
    .then((data) => {
      overlayIcon.style.color = "green";
      setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.display = "none";
        dashOverlayIcon.style.color = "red";
      }, 1000);
      let div = document.createElement("div");
      div.innerHTML = data;
      unPubviewArea.innerHTML = div.innerHTML;
      <dashboard></dashboard>;
    })
    .catch((err) => {
      overlayIcon.style.color = "red";
      setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.display = "none";
      }, 1000);
      unPubviewArea.innerHTML = "";
      unPubviewArea.innerText = "Data Not Found" + err.message;
    });
}
