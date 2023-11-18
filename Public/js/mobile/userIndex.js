//splash Animation
let overlay = document.querySelector(".overlay");
let overlayIcon = document.querySelector(".overlayIcon");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    overlayIcon.style.color = "green";
  }, 1000);
  setTimeout(() => {
    overlay.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    overlay.style.display = "none";
  }, 3000);
});
