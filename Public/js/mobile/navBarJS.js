//account button toggle
let accBtn = document.querySelector(".text");
accBtn.addEventListener("click", () => {
  let accIcon = document.querySelector(".accFaIcon");
  let accOption = document.querySelector(".accOption");
  let accIconDiv = document.querySelector(".accIcon");
  if (accIcon.classList.contains("fa-sort-down")) {
    accIcon.classList.remove("fa-sort-down");
    accIconDiv.style.marginTop = "14px";
    accIcon.classList.add("fa-sort-up");
    accOption.style.transform = "rotateX(0deg)";
  } else {
    accOption.style.transform = "rotateX(270deg)";
    setTimeout(() => {
      accIcon.classList.remove("fa-sort-up");
      accIcon.classList.add("fa-sort-down");
      accIconDiv.style.marginTop = "-4px";
    }, 600);
  }
  accOption.classList.toggle("reveal");
});
