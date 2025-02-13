const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  const icon = menuButton.querySelector("i");
  if (mobileMenu.classList.contains("hidden")) {
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
  } else {
    icon.classList.remove("ri-menu-line");
    icon.classList.add("ri-close-line");
  }
});