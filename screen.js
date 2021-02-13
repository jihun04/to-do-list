const head = document.querySelector("head");

const MOBILECSS_FN = "index-mobile.css";

function loadScreenCss() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if(screenWidth <= 680 || screenHeight <= 650) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "index-mobile.css";
        link.classList.add("stylesheet");
        head.appendChild(link);
    }
}

function handleResize() {
    const stylesheet = head.querySelector(".stylesheet");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if(screenWidth <= 680 || screenHeight <= 650) {
        if(stylesheet === null) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "index-mobile.css";
            link.classList.add("stylesheet");
            head.appendChild(link);
        }
    } else {
        if(stylesheet !== null) {
            head.removeChild(stylesheet);
        }
    }
}

function init() {
    loadScreenCss();
    window.addEventListener("resize", handleResize);
}

init();