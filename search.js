const searchForm = document.querySelector(".search-form"),
searchWith = searchForm.querySelector(".search-with"),
searchWithBtn = searchWith.querySelector(".search-with-btn"),
searchWithFirstText = searchWith.querySelector(".search-with-first-text"),
searchWithIcon = searchWith.querySelector("i"),
searchWithListBox = searchWith.querySelector(".search-with-list-box"),
searchWithUL = searchWithListBox.querySelector(".search-with-list"),
searchInput = searchForm.querySelector("input");

const SEARCHWITH_LS = "search-with",
SEARCHWITHLIST_LS = "search-with-list",
SEARCHWITH_ACTIVE_CN = "search-with-active",
SEARCHWITHLISTBOX_ACTIVE_CN = "search-with-list-box-active",
SEARCHWITHITEMMARKER_CN = "search-with-itemmarker",
DOT_CN = "dot",
SEARCHWITHFIRSTTEXTFADEOUT_CN = ".search-with-first-text-fadeout";

let searchWithUrl = "",
searchWithList = [],
newSearchWithId = "";

function genSearchWithId(id) {
  const sameId = searchWithList.filter(function(li) {
    return id === li.id;
  })
  if(sameId.length === 0) {
    newSearchWithId = id;
  } else {
    genSearchWithId(id + 1);
  }
}

function saveSearchWithList() {
  localStorage.setItem(SEARCHWITHLIST_LS, JSON.stringify(searchWithList));
}

function saveSearchWithUrl() {
  localStorage.setItem(SEARCHWITH_LS, searchWithUrl);
}

function loadSearchWithFirstText() {
  const li = searchWithList.filter(function(li) {
    return searchWithUrl === li.url;
  })
  const text = li[0].name;
  const firstText = text.charAt(0);
  searchWithFirstText.innerText = firstText;
}

function setSearchWithUrl(event) {
  let target = event.target;
  if(target.localName === "li") {
    target = target;
  } else if(target.parentNode.localName === "li") {
    target = target.parentNode;
  } else {
    target = target.parentNode.parentNode;
  }
  const LIOfSameId = searchWithList.filter(function(li) {
    return parseInt(target.id) === li.id;
  })
  searchWithUrl = LIOfSameId[0].url;
  searchWithListBox.classList.remove(SEARCHWITHLISTBOX_ACTIVE_CN);
  searchWithListBox.addEventListener("transitionend", function() {
    searchWithIcon.classList.remove(SEARCHWITH_ACTIVE_CN);
  })
  loadSearchWithFirstText();
  saveSearchWithUrl();
}

function paintSearchWith(name, url) {
  const li = document.createElement("li");
  const searchWithItemmarker = document.createElement("div");
  const dot = document.createElement("div");
  const second = document.createElement("div");
  const third = document.createElement("div");
  const span = document.createElement("span");
  const id = searchWithList.length;
  genSearchWithId(id);
  const searchWithObj = {
    name,
    id: newSearchWithId,
    url
  }
  searchWithList.push(searchWithObj);
  li.id = newSearchWithId;
  span.innerText = name;
  searchWithItemmarker.classList.add(SEARCHWITHITEMMARKER_CN);
  dot.classList.add(DOT_CN);
  li.appendChild(searchWithItemmarker);
  li.appendChild(span);
  searchWithItemmarker.appendChild(dot);
  searchWithItemmarker.appendChild(second);
  searchWithItemmarker.appendChild(third);
  searchWithUL.appendChild(li);
  li.addEventListener("click", setSearchWithUrl);
  saveSearchWithList();
}

function loadSearchWith() {
  const loadedSearchWithList = localStorage.getItem(SEARCHWITHLIST_LS);
  const loadedSearchWith = localStorage.getItem(SEARCHWITH_LS);
  if(loadedSearchWithList !== null) {
    const parsed = JSON.parse(loadedSearchWithList);
    const first = parsed[0].name;
    const second = parsed[1].name;
    const third = parsed[2].name;
    if(first !== "Google" || second !== "Youtube" || third !== "Bing") {
      paintSearchWith("Google", "https://www.google.com/search?q=");
      paintSearchWith("Youtube", "https://www.youtube.com/results?search_query=");
      paintSearchWith("Bing", "https://www.bing.com/search?q=");
    } else {
      parsed.forEach(function(li) {
        paintSearchWith(li.name, li.url);
      });
    }
  } else {
    paintSearchWith("Google", "https://www.google.com/search?q=");
      paintSearchWith("Youtube", "https://www.youtube.com/results?search_query=");
      paintSearchWith("Bing", "https://www.bing.com/search?q=");
  }
  if(loadedSearchWith === null) {
    searchWithUrl = "https://www.google.com/search?q=";
    saveSearchWithUrl();
  } else {
    searchWithUrl = loadedSearchWith;
  }
  loadSearchWithFirstText();
}

function handleSearchWithClick() {
  if(searchWithIcon.classList[2] === "search-with-active") {
    searchWithListBox.classList.remove(SEARCHWITHLISTBOX_ACTIVE_CN);
    searchWithListBox.addEventListener("transitionend", function() {
      searchWithIcon.classList.remove(SEARCHWITH_ACTIVE_CN);
    })
  } else {
    searchWithListBox.classList.add(SEARCHWITHLISTBOX_ACTIVE_CN);
    searchWithListBox.addEventListener("transitionend", function() {
      searchWithIcon.classList.add(SEARCHWITH_ACTIVE_CN);
    })
  }
}

function handleSearch(event) {
  event.preventDefault();
  const searchValue = searchInput.value;
  const search = searchWithUrl + searchValue;
  window.location.replace(search);
}

function init() {
  loadSearchWith();
  searchWithBtn.addEventListener("click", handleSearchWithClick);
  searchForm.addEventListener("submit", handleSearch);
}

init();