// controll button click handler
let controlBtns = document.querySelectorAll(".controlPanel>div");
let viewArea = document.querySelector(".viewArea");
[...controlBtns].forEach((btn) => {
  btn.addEventListener("click", (e) => {
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
        let div = document.createElement("div");
        div.innerHTML = data;
        viewArea.innerHTML = div.innerHTML;
      })
      .catch((err) => {
        viewArea.innerHTML = "";
        viewArea.innerText = "Data Not Found" + err.message;
      });
  });
});
