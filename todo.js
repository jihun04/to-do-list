const toDoBox = document.querySelector(".toDo-box"),
toDoForm = toDoBox.querySelector(".ja-toDoFrom"),
toDoInput = toDoForm.querySelector("input"),
toDoList = toDoBox.querySelector(".js-toDoList"),
toDoListDone = toDoBox.querySelector(".js-toDoList--done"),
toDoBar = toDoBox.querySelector(".toDo-bar"),
toDoProgressBar = toDoBox.querySelector(".toDo-progress-bar"),
toDoProgress = toDoBox.querySelector(".toDo-progress"),
toDoListsBtns = toDoBox.querySelector(".toDoLists-btns"),
toDoListToDoBtn = toDoListsBtns.querySelector(".toDoLists-btns__toDo-btn"),
toDoListDoneBtn = toDoListsBtns.querySelector(".toDoLists-btns__done-btn");

const TODOS_LS = "toDos",
TODOSDONE_LS = "toDos--done",
TODOTEXT_CN = "toDo-text",
TODOTEXTDONE_CN = "toDo-text--done",
CLOSELIST_CN = "toDoList--close",
OPENLIST_CN = "toDoList--open",
APPEARTODOBAR_CN = "appear-toDo-bar",
DISAPPEARTODOBAR_CN = "disappear-toDo-bar",
APPEARTODOLISTSBTNS = "appear-toDoLists-btns",
DISAPPEARTODOLISTSBTNS = "disappear-toDoList-btns",
TODOLISTSTATUS_LS = "toDoListStatus",
CLICKEDLISTBTN_CN = "clicked-list-btn",
DATEBOX_CN = "date-box",
DATEBOXHOVER_CN = "date-box-hover";

let listStatus = "";

let toDos = [],
toDosDone = [],
newToDoId = "";

function removeClickedToDoText(li) {
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return parseInt(li.id) !== toDo.id;
    })
    toDos = cleanToDos;
    saveTodos();
}

function removeClickedToDoDoneText(li) {
    toDoListDone.removeChild(li);
    const cleanToDos = toDosDone.filter(function(toDo) {
        return parseInt(li.id) !== toDo.id;
    })
    toDosDone = cleanToDos;
    saveTodos();
}

function handleToDoTextClick(event) {
    const text = event.target;
    paintToDo(text.innerText, "done", "null");
    if(text.className === "toDo-text") {
        const li = text.parentNode;
        removeClickedToDoText(li);
    } else {
        const li = text.parentNode.parentNode;
        removeClickedToDoText(li);
    }
}

function handleToDoDoneTextClick(event) {
    const text = event.target;
    paintToDo(text.innerText, "toDo", "null");
    if(text.classList[1] === "toDo-text") {
        const li = text.parentNode;
        removeClickedToDoDoneText(li);
    } else {
        const li = text.parentNode.parentNode;
        removeClickedToDoDoneText(li);
    }
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
}

function deleteToDoDone(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoListDone.removeChild(li);
    const cleanToDos = toDosDone.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDosDone = cleanToDos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(TODOSDONE_LS, JSON.stringify(toDosDone));
    handleChangeToDo();
}

function handleToDoMouseEnter(event) {
    const target = event.target;
    const dateBox = target.firstChild;
    dateBox.classList.add(DATEBOXHOVER_CN);
}

function handleToDoMouseLeave(event) {
    const target = event.target;
    const dateBox = target.firstChild;
    dateBox.classList.remove(DATEBOXHOVER_CN);
}

function  genToDoId(id, div) {
    let currentToDos = "";
    if(div === "done") {
        currentToDos = toDosDone;
    } else {
        currentToDos = toDos;
    }
    const sameId = currentToDos.filter(function(toDo) {
        return id === toDo.id
    });
    if(sameId.length === 0) {
        newToDoId = id;
    } else {
        genToDoId(id + 1, div);
    }    
}

function paintToDo(text, div, date) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const toDoText = document.createElement("div");
    const span = document.createElement("span");
    if(div === "done") {
        const dateBox = document.createElement("div");
        const dateSpan = document.createElement("span");
        if(date === "null") {
            const newDate = new Date();
            const gotYear = newDate.getFullYear();
            const gotMonth = newDate.getMonth() + 1;
            const gotDate = newDate.getDate();
            dateSpan.innerText = `${gotYear}-${gotMonth < 10 ? `0${gotMonth}` : gotMonth}-${gotDate < 10 ? `0${gotDate}` : gotDate}`;
        } else {
            dateSpan.innerText = date;
        }
        dateBox.classList.add(DATEBOX_CN);
        toDoText.classList.add(TODOTEXTDONE_CN);
        li.addEventListener("mouseenter", handleToDoMouseEnter);
        li.addEventListener("mouseleave", handleToDoMouseLeave);
        delBtn.addEventListener("click", deleteToDoDone);
        toDoText.addEventListener("click", handleToDoDoneTextClick);
        dateBox.appendChild(dateSpan);
        li.prepend(dateBox);
        toDoListDone.prepend(li);
        genToDoId(toDosDone.length + 1, div);
    } else {
        delBtn.addEventListener("click", deleteToDo);
        toDoText.addEventListener("click", handleToDoTextClick);
        toDoList.prepend(li);
        genToDoId(toDos.length + 1, div);
    }
    const newId = newToDoId;
    delBtn.innerText = "X";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(toDoText);
    li.id = newId;
    toDoText.appendChild(span);
    toDoText.classList.add(TODOTEXT_CN);
    if(div === "done") {
        if(date === "null") {
            const newDate = new Date();
            const gotYear = newDate.getFullYear();
            const gotMonth = newDate.getMonth() + 1;
            const gotDate = newDate.getDate();
            const toDoObj = {
                text: text,
                id: newId,
                date: `${gotYear}-${gotMonth < 10 ? `0${gotMonth}` : gotMonth}-${gotDate < 10 ? `0${gotDate}` : gotDate}`
            };
            toDosDone.push(toDoObj);
        } else {
            const toDoObj = {
                text: text,
                id: newId,
                date
            };
            toDosDone.push(toDoObj);
        }
    } else {
        const toDoObj = {
            text: text,
            id: newId,
            date
        };
        toDos.push(toDoObj);
    }
    saveTodos();
}

function handleToDoSubmit(event) {
    const currentListStatus = localStorage.getItem(TODOLISTSTATUS_LS);
    event.preventDefault();
    if(currentListStatus === "toDo" || currentListStatus === "done") {
        const currentValue = toDoInput.value;
        paintToDo(currentValue, "toDo", "null");
    }
    toDoInput.value = "";
}

function handleToDoFormClick() {
    const currentListStatus = localStorage.getItem(TODOLISTSTATUS_LS);
    if(currentListStatus === "toDo") {
        toDoList.classList.remove(CLOSELIST_CN);
        toDoList.classList.add(OPENLIST_CN);
    }
    if(currentListStatus === "done") {
        toDoListDone.classList.remove(CLOSELIST_CN);
        toDoListDone.classList.add(OPENLIST_CN);
    }
    toDoBar.classList.remove(DISAPPEARTODOBAR_CN);
    toDoBar.classList.add(APPEARTODOBAR_CN);
    toDoListsBtns.classList.remove(APPEARTODOLISTSBTNS);
    toDoListsBtns.classList.add(DISAPPEARTODOLISTSBTNS);
}

function handleListStatus() {
    const currentListStatus = localStorage.getItem(TODOLISTSTATUS_LS);
    if(currentListStatus === "toDo") {
        toDoListToDoBtn.classList.add(CLICKEDLISTBTN_CN);
        toDoListDoneBtn.classList.remove(CLICKEDLISTBTN_CN);
    } else if(currentListStatus === "done") {
        toDoListToDoBtn.classList.remove(CLICKEDLISTBTN_CN);
        toDoListDoneBtn.classList.add(CLICKEDLISTBTN_CN);
    }
    if(currentListStatus === "toDo" || currentListStatus === "done") {
        toDoInput.placeholder = "Write a to do";
    } else {
        toDoInput.placeholder = "Please select";
    }
}

function handleListToDoClick() {
    listStatus = "toDo";
    localStorage.setItem(TODOLISTSTATUS_LS, listStatus);
    toDoList.classList.remove(CLOSELIST_CN);
    toDoList.classList.add(OPENLIST_CN);
    toDoBar.classList.remove(DISAPPEARTODOBAR_CN);
    toDoBar.classList.add(APPEARTODOBAR_CN);
    toDoListsBtns.classList.remove(APPEARTODOLISTSBTNS);
    toDoListsBtns.classList.add(DISAPPEARTODOLISTSBTNS);
    handleListStatus();
}

function handleListDoneClick() {
    listStatus = "done";
    localStorage.setItem(TODOLISTSTATUS_LS, listStatus);
    toDoListDone.classList.remove(CLOSELIST_CN);
    toDoListDone.classList.add(OPENLIST_CN);
    toDoBar.classList.remove(DISAPPEARTODOBAR_CN);
    toDoBar.classList.add(APPEARTODOBAR_CN);
    toDoListsBtns.classList.remove(APPEARTODOLISTSBTNS);
    toDoListsBtns.classList.add(DISAPPEARTODOLISTSBTNS);
    handleListStatus();
}

function handleToDoBarClick() {
    const currentListStatus = localStorage.getItem(TODOLISTSTATUS_LS);
    if(currentListStatus === "toDo") {
        toDoList.classList.add(CLOSELIST_CN);
        toDoList.classList.remove(OPENLIST_CN);
    }
    if(currentListStatus === "done") {
        toDoListDone.classList.add(CLOSELIST_CN);
        toDoListDone.classList.remove(OPENLIST_CN);
    }
    toDoBar.classList.add(DISAPPEARTODOBAR_CN);
    toDoBar.classList.remove(APPEARTODOBAR_CN);
    toDoListsBtns.classList.add(APPEARTODOLISTSBTNS);
    toDoListsBtns.classList.remove(DISAPPEARTODOLISTSBTNS);
    handleListStatus();
    toDoListToDoBtn.addEventListener("click", handleListToDoClick);
    toDoListDoneBtn.addEventListener("click", handleListDoneClick);
}

function askListStatus() {
    toDoList.classList.add(CLOSELIST_CN);
    toDoList.classList.remove(OPENLIST_CN);
    toDoBar.classList.add(DISAPPEARTODOBAR_CN);
    toDoBar.classList.remove(APPEARTODOBAR_CN);
    toDoListsBtns.classList.add(APPEARTODOLISTSBTNS);
    toDoListsBtns.classList.remove(DISAPPEARTODOLISTSBTNS);
    toDoListToDoBtn.addEventListener("click", handleListToDoClick);
    toDoListDoneBtn.addEventListener("click", handleListDoneClick);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedToDosDone = localStorage.getItem(TODOSDONE_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text, "toDo", "null");
        })
    }
    if(loadedToDosDone !== null) {
        const parsedToDosDone = JSON.parse(loadedToDosDone);
        parsedToDosDone.forEach(function(toDo) {
            paintToDo(toDo.text, "done", toDo.date);
        })
    }
}

function handleChangeToDo() {
    const currentProgress = parseInt(toDoProgress.innerText.split("%")[0]);
    const progress = Math.ceil(toDosDone.length / (toDos.length + toDosDone.length) * 100);
    const diff = Math.abs(progress - currentProgress);
    for (let i = 0; i <= diff; i++) {
        if (currentProgress < progress) {
            toDoProgressBar.style.width = `${currentProgress + i}%`;
            toDoProgress.innerText = `${currentProgress + i}%`;
        } else if (currentProgress > progress) {
            toDoProgressBar.style.width = `${currentProgress - i}%`;
            toDoProgress.innerText = `${currentProgress - i}%`;
        }
    };
}

function init() {
    loadToDos();
    askListStatus();
    handleListStatus();
    toDoForm.addEventListener("submit", handleToDoSubmit);
    toDoForm.addEventListener("click", handleToDoFormClick);
    toDoBar.addEventListener("click", handleToDoBarClick);
}

init()
