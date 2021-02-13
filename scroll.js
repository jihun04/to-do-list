const arrowIcon = document.querySelector(".arrow-icon");

const DOWN_CN = "fa-chevron-down",
UP_CN = "fa-chevron-up",
SPIN_CN = "spin-y-180",
POSITIONFIXED_CN = "position-fixed-top-0";

function pageUp() {
  document.documentElement.scrollTop = 0;
}

function pageDown() {
  document.documentElement.scrollTop = document.documentElement.scrollHeight;
}

function handleScroll() {
  const screenHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop;
  const top = screenHeight - scrollTop;
  if(top <= 0) {
    arrowIcon.classList.add(POSITIONFIXED_CN);
    arrowIcon.classList.remove(SPIN_CN);
    arrowIcon.classList.add(UP_CN);
    arrowIcon.classList.remove(DOWN_CN);
    arrowIcon.addEventListener("click", pageUp);
    arrowIcon.removeEventListener("click", pageDown);
  } else {
    arrowIcon.classList.add(SPIN_CN)
    arrowIcon.classList.remove(POSITIONFIXED_CN);
    arrowIcon.classList.add(DOWN_CN);
    arrowIcon.classList.remove(UP_CN);
    arrowIcon.addEventListener("click", pageDown);
    arrowIcon.removeEventListener("click", pageUp);
  }
}

function init() {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
}

init();