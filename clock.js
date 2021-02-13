const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector(".js-title"),
timestamp = document.querySelector(".timestamp"),
timestampSpan = timestamp.querySelector("span"),
clockExchangeBtn = clockContainer.querySelector(".clock-exchange-btn"),
clockAmPm = clockContainer.querySelector(".clock-am-pm");

const TIMESTAMP_LS = "timestamp",
APPEARTIMESTAMP_CN = "appear-timestamp",
DISAPPEARTIMESTAMP_CN = "disappear-timestamp",
RGB_LS = "rgb",
ALPHA_LS = "alpha",
CLOCKCOLOR_LS = "clock-color",
CLOCKSTATE_LS = "clock-state",
CLOCKFADEOUT_CN = "clock-fadeout",
CLOCKEXBTNROTATE_CN = "clock-ex-btn-rotate";

function genRGB() {
    const rgb = Math.ceil(Math.random() * 255);
    return rgb;
}

function genA() {
    const alpha = Math.random() * (0.9 - 0.6) + 0.6;
    return alpha;
}

function changeClockColor() {
    const R = genRGB();
    const G = genRGB();
    const B = genRGB();
    const alpha = genA();
    clockContainer.style.color = `rgba(${R}, ${G}, ${B}, ${alpha})`;
}

function getTime() {
    const clockColorLs = localStorage.getItem(CLOCKCOLOR_LS);
    const loadedClockState = localStorage.getItem(CLOCKSTATE_LS);
    const dates = new Date();
    const year = dates.getFullYear();
    let month = dates.getMonth();
    const date = dates.getDate();
    let day = dates.getDay();
    let minutes = dates.getMinutes();
    let hours = dates.getHours();
    if(month === 0) {
        month = "January";
    }
    if(month === 1) {
        month = "February";
    }
    if(month === 2) {
        month = "March";
    }
    if(month === 3) {
        month = "April";
    }
    if(month === 4) {
        month = "May";
    }
    if(month === 5) {
        month = "June";
    }
    if(month === 6) {
        month = "July";
    }
    if(month === 7) {
        month = "August";
    }
    if(month === 8) {
        month = "September";
    }
    if(month === 9) {
        month = "October";
    }
    if(month === 10) {
        month = "November";
    }
    if(month === 11) {
        month = "December";
    }
    if(day === 1) {
        day = "Mon";
    }
    if(day === 2) {
        day = "Tue";
    }
    if(day === 3) {
        day = "Wed";
    }
    if(day === 4) {
        day = "Thu";
    }
    if(day === 5) {
        day = "Fri";
    }
    if(day === 6) {
        day = "Sat";
    }
    if(day === 0) {
        day = "Sun";
    }
    if(loadedClockState === "initialized") {
        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
        clockAmPm.classList.add(NONE);
    } else if(loadedClockState === "exchanged") {
        let ampm = "";
        if(hours >= 0 && hours < 12) {
            ampm = "AM";
        } else {
            ampm = "PM";
        }
        if(hours === 0) {
            hours = 12;
        }
        if(hours === 13) {
            hours = 1;
        }
        if(hours === 14) {
            hours = 2;
        }
        if(hours === 15) {
            hours = 3;
        }
        if(hours === 16) {
            hours = 4;
        }
        if(hours === 17) {
            hours = 5;
        }
        if(hours === 18) {
            hours = 6;
        }
        if(hours === 19) {
            hours = 7;
        }
        if(hours === 20) {
            hours = 8;
        }
        if(hours === 21) {
            hours = 9;
        }
        if(hours === 22) {
            hours = 10;
        }
        if(hours === 23) {
            hours = 11;
        }
        clockTitle.innerText = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
        clockAmPm.classList.remove(NONE);
        clockAmPm.innerText = ampm;
    }
    timestampSpan.innerText = `${month} ${date < 10 ? `0${date}` : date} ${day}, ${year}`;
    if(clockColorLs === "on") {
        changeClockColor();
    }
}

function appearTimestamp() {
    timestamp.classList.add(APPEARTIMESTAMP_CN);
    timestamp.classList.remove(DISAPPEARTIMESTAMP_CN);
}

function disappearTimestamp() {
    timestamp.classList.add(DISAPPEARTIMESTAMP_CN);
    timestamp.classList.remove(APPEARTIMESTAMP_CN);
}

function loadTimestamp() {
    const currentTimestamp = localStorage.getItem(TIMESTAMP_LS);
    if(currentTimestamp === "on") {
        appearTimestamp();
    } else if(currentTimestamp === "off") {
        disappearTimestamp();
    } else {
        localStorage.setItem(TIMESTAMP_LS, "on");
    }
}

function loadClockState() {
    const loadedClockState = localStorage.getItem(CLOCKSTATE_LS);
    if(loadedClockState === null) {
        localStorage.setItem(CLOCKSTATE_LS, "initialized");
    }
}

function handleClockClick() {
    const currentTimestamp = localStorage.getItem(TIMESTAMP_LS);
    const clockColorLs = localStorage.getItem(CLOCKCOLOR_LS);
    if(currentTimestamp === "on" && clockColorLs !== "on") {
        localStorage.setItem(TIMESTAMP_LS, "off");
    } else if(currentTimestamp === "off" && clockColorLs !== "on") {
        localStorage.setItem(TIMESTAMP_LS, "on");
    }
    if(clockColorLs === "on") {
        localStorage.setItem(CLOCKCOLOR_LS, "off");
        clockContainer.style.color = "white";
    }
    loadTimestamp();
}

function handleExchangeClick() {
    const loadedClockState = localStorage.getItem(CLOCKSTATE_LS);
    if(loadedClockState === "initialized") {
        clockTitle.classList.add(CLOCKFADEOUT_CN);
        clockTitle.addEventListener("transitionend", function() {
            localStorage.setItem(CLOCKSTATE_LS, "exchanged");
            clockExchangeBtn.classList.add(CLOCKEXBTNROTATE_CN);
            clockExchangeBtn.addEventListener("transitionend", function() {
                getTime();
                clockAmPm.classList.remove(NONE);
                clockTitle.classList.remove(CLOCKFADEOUT_CN);
            })
        })
    } else if(loadedClockState === "exchanged") {
        clockAmPm.classList.add(NONE);
        clockTitle.classList.add(CLOCKFADEOUT_CN);
        clockTitle.addEventListener("transitionend", function() {
            localStorage.setItem(CLOCKSTATE_LS, "initialized");
            clockExchangeBtn.classList.remove(CLOCKEXBTNROTATE_CN);
            clockExchangeBtn.addEventListener("transitionend", function() {
                getTime();
                clockTitle.classList.remove(CLOCKFADEOUT_CN);
            })
        })
    }
}

function init(){
    getTime();
    setInterval(getTime, 1000);
    loadTimestamp();
    loadClockState();
    clockTitle.addEventListener("click", handleClockClick);
    clockExchangeBtn.addEventListener("click", handleExchangeClick);
};
init();