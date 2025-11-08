document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastmodified").textContent =
  "Last Modified: " + document.lastModified;

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    hamburger.innerHTML = "&#10005;";
  } else {
    hamburger.innerHTML = "&#9776;";
  }
});

