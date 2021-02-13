const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing",
  NONE = "none";
  
let SHINE_CN = "";

function saveName(text){
  localStorage.setItem(USER_LS, text); 
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
    greeting.classList.remove(SHOWING_CN);
}

function genRandom() {
  return Math.ceil(Math.random() * 2);
}

function paintGreeting(text) {
  const random = genRandom();
  if(random === 1) {
    SHINE_CN = "shine1";
  } else {
    SHINE_CN = "shine2";
  }
  greeting.classList.add(SHINE_CN);
  greeting.classList.add(SHOWING_CN);
  form.classList.remove(SHOWING_CN);
  const date = new Date;
  const hours = date.getHours();
  if(hours >= 6 && hours < 12) {
    greeting.innerText = `Good morning, ${text}`;
  } else if(hours >= 12 && hours < 18) {
    greeting.innerText = `Good afternoon, ${text}`;
  } else if(hours >= 18 && hours <= 24) {
    greeting.innerText = `Good evening, ${text}`;
  } else {
    greeting.innerText = `Hello ${text}`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function handleClick(){
  greeting.classList.remove(SHINE_CN);
  removeName();
}

function removeName(){
  localStorage.removeItem(USER_LS);
  loadName()
}

function init() {
  loadName();
  greeting.addEventListener("click", handleClick);
}

init();