let unPubviewArea = document.querySelector(".viewArea");
function fetchReq(btn) {
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
      unPubviewArea.innerHTML = div.innerHTML;
    })
    .catch((err) => {
      unPubviewArea.innerHTML = "";
      unPubviewArea.innerText = "Data Not Found" + err.message;
    });
}
