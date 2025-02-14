document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuContent = document.getElementById("mobileMenuContent");
  const menuIcon = mobileMenuBtn.querySelector("i");

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    menuIcon.className = isMenuOpen
      ? "ri-close-line text-xl"
      : "ri-menu-line text-xl";

    mobileMenuContent.style.opacity = isMenuOpen ? "1" : "0";
    mobileMenuContent.style.transform = isMenuOpen
      ? "translateY(0)"
      : "translateY(-8px)";
    mobileMenuContent.style.pointerEvents = isMenuOpen ? "auto" : "none";
  }

  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      !mobileMenuContent.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMenu();
    }
  });
});
