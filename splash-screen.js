const splashScreen = document.querySelector(".splash-screen");

const SPLASHLOG_LS = "splash-log",
SPLASHSCREENPAINT_CN = "splash-screen--paint",
SPLASHSCREENERASE_CN = "splash-screen--erase";

function handleLoad() {
  const loadedSplashLog = localStorage.getItem(SPLASHLOG_LS);
  const newDate = new Date();
  if(loadedSplashLog !== null) {
    const parsed = JSON.parse(loadedSplashLog);
    const seconds = (newDate - parseInt(parsed)) / 1000;
    if(seconds <= 20) {
      splashScreen.classList.remove(SPLASHSCREENPAINT_CN);
      splashScreen.classList.add(SPLASHSCREENERASE_CN);
    }
  }
  localStorage.setItem(SPLASHLOG_LS, newDate.getTime());
}

function init() {
  handleLoad();
}

init();