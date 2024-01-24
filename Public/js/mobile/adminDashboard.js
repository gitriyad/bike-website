// controll button click handler
let dashOverlay = document.querySelector(".overlay");
let dashOverlayIcon = document.querySelector(".overlayIcon");
let controlBtns = document.querySelectorAll(".controlPanel>div");
let viewArea = document.querySelector(".viewArea");
[...controlBtns].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    dashOverlay.style.display = "flex";
    dashOverlay.style.opacity = "1";
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
        dashOverlayIcon.style.color = "green";
        setTimeout(() => {
          dashOverlay.style.opacity = "0";
          dashOverlay.style.display = "none";
          dashOverlayIcon.style.color = "red";
        }, 1000);
        let div = document.createElement("div");
        div.innerHTML = data;
        viewArea.innerHTML = div.innerHTML;
      })
      .catch((err) => {
        dashOverlayIcon.style.color = "red";
        setTimeout(() => {
          dashOverlay.style.opacity = "0";
          dashOverlay.style.display = "none";
        }, 1000);
        viewArea.innerHTML = "";
        viewArea.innerText = "Data Not Found" + err.message;
      });
  });
});
