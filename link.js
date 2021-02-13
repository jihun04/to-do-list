const linkBtn = document.querySelector(".link-btn"),
linkUrlInput = document.querySelector(".link-url-input"),
linkNameInput = document.querySelector(".link-name-input"),
imageColumns = document.querySelector(".image-columns"),
linkList = document.querySelector(".link-list"),
linkForm = document.querySelector(".link-form"),
footer = document.querySelector("footer");

const LINKSTATE_LS = "link-state",
LINKBTN_ACTIVE_CN = "link-btn--active",
INPUT_BORDERRIGHTRADIUS_CN = "input--border-right-radius",
INPUT_NOTBORDERRADIUS_CN = "input--not-border-radius",
FOOTERLISTFADEIN_CN = "footer__list-fadein",
FOOTERLISTFADEOUT_CN = "footer__list-fadeout",
FOOTERLISTFADEOUTEND_CN = "footer__list-fadeout-end",
LINKS_LS = "links",
FOOTEROTHERHEIGHT = 60,
FORMHEIGHT = 40,
FUCK = 2,
LINKMORE_CLICKED_CN = "link-more-clicked",
LINKMORE_UNCLICKED_CN = "link-more-unclicked",
FOOTER_BGWHITE_CN = "footer-bg-white",
FOOTER_BGBLACK_CN = "footer-bg-black";

let links = [],
newLinkId = 0;

function saveLinks() {
  localStorage.setItem(LINKS_LS, JSON.stringify(links))
}

function genLinkId(id) {
  const sameId = links.filter(function(link) {
    return id === link.id
  })
  if(sameId.length === 0) {
    newLinkId = id
  } else {
    genLinkId(id + 1);
  }
}

function addLink(event) {
  event.preventDefault();
  const urlValue = linkUrlInput.value;
  const nameValue = linkNameInput.value;
  linkUrlInput.value = "";
  linkNameInput.value = "";
  if(footer.style.height !== "auto") {
    footer.style.height = "auto";
  }
  loadLink(nameValue, urlValue);
}

function handleFadeoutEnd() {
  const loadedLinkState = localStorage.getItem(LINKSTATE_LS);
  if(loadedLinkState === "active") {
    imageColumns.classList.add(FOOTERLISTFADEOUTEND_CN);
    if(footer.style.height !== "auto") {
      footer.style.height = `${FOOTEROTHERHEIGHT + FORMHEIGHT + linkList.clientHeight + FUCK}px`;
    }
  } else {
    linkList.classList.add(FOOTERLISTFADEOUTEND_CN);
    if(footer.style.height !== "auto") {
      footer.style.height = `${FOOTEROTHERHEIGHT + FORMHEIGHT + imageColumns.clientHeight}px`;
    }
  }
}

function eraseLinks() {
  if(linkList.clientHeight > imageColumns.clientHeight) {
    footer.style.height = `${footer.clientHeight}px`;
  }
  linkBtn.classList.remove(LINKBTN_ACTIVE_CN);
  linkForm.classList.add(NONE);
  linkList.classList.add(FOOTERLISTFADEOUT_CN);
  linkList.classList.remove(FOOTERLISTFADEIN_CN);
  imageUrlForm.classList.remove(NONE);
  imageColumns.classList.remove(FOOTERLISTFADEOUT_CN);
  imageColumns.classList.remove(FOOTERLISTFADEOUTEND_CN);
  imageColumns.classList.add(FOOTERLISTFADEIN_CN);
  footer.classList.remove(FOOTER_BGWHITE_CN);
  footer.classList.add(FOOTER_BGBLACK_CN);
  localStorage.setItem(LINKSTATE_LS, "unactive");
  linkList.addEventListener("animationend", handleFadeoutEnd);
}

function paintLinks() {
  if(linkList.clientHeight < imageColumns.clientHeight) {
    footer.style.height = `${footer.clientHeight}px`;
  }
  linkBtn.classList.add(LINKBTN_ACTIVE_CN);
  linkForm.classList.remove(NONE);
  linkList.classList.remove(FOOTERLISTFADEOUT_CN);
  linkList.classList.remove(FOOTERLISTFADEOUTEND_CN);
  linkList.classList.add(FOOTERLISTFADEIN_CN);
  imageUrlForm.classList.add(NONE);
  imageColumns.classList.add(FOOTERLISTFADEOUT_CN);
  imageColumns.classList.remove(FOOTERLISTFADEIN_CN);
  footer.classList.remove(FOOTER_BGBLACK_CN);
  footer.classList.add(FOOTER_BGWHITE_CN);
  localStorage.setItem(LINKSTATE_LS, "active");
  imageColumns.addEventListener("animationend", handleFadeoutEnd);
}

function modifyLink(event) {
  event.preventDefault();
  const target = event.target;
  const linkNameInputModify = target.childNodes[0];
  const linkUrlInputModify = target.childNodes[1];
  const nameValue = linkNameInputModify.value;
  const urlValue = linkUrlInputModify.value;
  const linkModify = target.parentNode;
  const link = linkModify.nextSibling;
  const linkName = link.firstChild;
  const linkUrl = link.lastChild;
  const li = linkModify.parentNode;
  const cleanLinks = links.filter(function(link) {
    return parseInt(li.id) !== link.id
  });
  links = cleanLinks;
  const id = links.length + 1;
  genLinkId(id);
  const linkObj = {
    id: newLinkId,
    name: nameValue,
    url: urlValue
  };
  links.push(linkObj);
  link.href = urlValue;
  linkNameInputModify.value = "";
  linkUrlInputModify.value = "";
  linkName.firstChild.innerText = nameValue;
  linkUrl.firstChild.innerText = urlValue;
  linkModify.classList.add(NONE);
  link.classList.remove(NONE);
  saveLinks();
}

function handleLinkMoreClick(event) {
  const clicked = document.querySelector(`.${LINKMORE_CLICKED_CN}`);
  let target = event.target;
  if(target.localName === "i") {
    target = target.parentNode;
  }
  const linkMoreBtns = target.nextSibling;
  if(clicked !== null) {
    if(clicked === target) {
      target.classList.add(LINKMORE_UNCLICKED_CN);
      target.classList.remove(LINKMORE_CLICKED_CN);
    } else {
      const listItem = target.parentNode;
      const link = listItem.childNodes[1];
      const linkModifyBtnSpan = linkMoreBtns.firstChild.firstChild;
      clicked.classList.add(LINKMORE_UNCLICKED_CN);
      clicked.classList.remove(LINKMORE_CLICKED_CN);
      linkMoreBtns.classList.remove(NONE);
      target.classList.remove(LINKMORE_UNCLICKED_CN);
      target.classList.add(LINKMORE_CLICKED_CN);
      if(link.classList[1] === "none") {
        linkModifyBtnSpan.innerText = "Cancel";
      } else {
        linkModifyBtnSpan.innerText = "Modify";
      }
    }
  } else {
    const listItem = target.parentNode;
    const link = listItem.childNodes[1];
    const linkModifyBtnSpan = linkMoreBtns.firstChild.firstChild;
    linkMoreBtns.classList.remove(NONE);
    target.classList.remove(LINKMORE_UNCLICKED_CN);
    target.classList.add(LINKMORE_CLICKED_CN);
    if(link.classList[1] === "none") {
      linkModifyBtnSpan.innerText = "Cancel";
    } else {
      linkModifyBtnSpan.innerText = "Modify";
    }
  }
}

function linkModifyBtnClick(event) {
  let target = event.target;
  if(target.localName === "span") {
    target = target.parentNode;
  }
  const linkMoreBtn = target.parentNode.previousSibling;
  const linkModifyBtnSpan = target.firstChild;
  const link = linkMoreBtn.previousSibling;
  const linkModify = link.previousSibling;
  if(linkModifyBtnSpan.innerText !== "Cancel") {
    link.classList.add(NONE);
    linkModify.classList.remove(NONE);
  } else {
    link.classList.remove(NONE);
    linkModify.classList.add(NONE);
  }
  linkMoreBtn.classList.add(LINKMORE_UNCLICKED_CN);
  linkMoreBtn.classList.remove(LINKMORE_CLICKED_CN);
}

function linkDeleteBtnClick(event) {
  let target = event.target;
  if(target.localName === "span") {
    target = target.parentNode;
  }
  const linkMoreBtn = target.parentNode.previousSibling;
  const li = linkMoreBtn.parentNode;
  const cleanLinks = links.filter(function(link) {
    return parseInt(li.id) !== link.id
  })
  linkList.removeChild(li);
  links = cleanLinks;
  saveLinks();
  footer.style.height = `${FOOTEROTHERHEIGHT + FORMHEIGHT + linkList.clientHeight + FUCK}px`;
  linkMoreBtn.classList.add(LINKMORE_UNCLICKED_CN);
  linkMoreBtn.classList.remove(LINKMORE_CLICKED_CN);
}

function loadLink(name, url) {
  const li = document.createElement("li");
  const linkModify = document.createElement("div")
  const link = document.createElement("a");
  const linkMoreBtn = document.createElement("div");
  const linkFormModify = document.createElement("form");
  const linkUrlInputModify = document.createElement("input");
  const linkNameInputModify = document.createElement("input");
  const linkSubmitInput = document.createElement("input");
  const linkName = document.createElement("div");
  const linkNameP = document.createElement("p");
  const linkUrl = document.createElement("div");
  const linkUrlP = document.createElement("p");
  const ellipsisIcon = document.createElement("i");
  const linkMoreBtns = document.createElement("div");
  const linkModifyBtn = document.createElement("div");
  const linkModifyBtnSpan = document.createElement("span");
  const linkDeleteBtn = document.createElement("div");
  const linkDeleteBtnSpan = document.createElement("span");
  const id = links.length + 1;
  genLinkId(id);
  const linkObj = {
    id: newLinkId,
    name,
    url
  }
  links.push(linkObj);
  saveLinks();
  linkModify.classList.add("link--modify");
  linkModify.classList.add(NONE);
  link.classList.add("link");
  linkMoreBtn.classList.add("link-more-btn");
  linkFormModify.classList.add("link-form--modify");
  linkUrlInputModify.classList.add("link-url-input--modify");
  linkNameInputModify.classList.add("link-name-input--modify");
  linkName.classList.add("link__text");
  linkName.classList.add("link-name");
  linkUrl.classList.add("link__text");
  linkUrl.classList.add("link-url");
  ellipsisIcon.classList.add("fas");
  ellipsisIcon.classList.add("fa-ellipsis-v");
  linkMoreBtns.classList.add("link-more-btn__btns");
  linkMoreBtns.classList.add(NONE);
  linkModifyBtn.classList.add("link-modify-btn");
  linkDeleteBtn.classList.add("link-delete-btn");
  linkSubmitInput.classList.add(NONE);
  link.href = url;
  linkNameP.innerText = name;
  linkUrlP.innerText = url;
  linkModifyBtnSpan.innerText = "Modify";
  linkDeleteBtnSpan.innerText = "Delete";
  linkUrlInputModify.required = true;
  linkNameInputModify.required = true;
  linkUrlInputModify.type = "url";
  linkNameInputModify.type = "text";
  linkSubmitInput.type = "submit";
  linkUrlInputModify.placeholder = "Write a link";
  linkNameInputModify.placeholder = "Write a name";
  li.id = newLinkId;
  li.appendChild(linkModify);
  li.appendChild(link);
  li.appendChild(linkMoreBtn);
  li.appendChild(linkMoreBtns);
  linkModify.appendChild(linkFormModify);
  linkFormModify.appendChild(linkNameInputModify);
  linkFormModify.appendChild(linkUrlInputModify);
  linkFormModify.appendChild(linkSubmitInput);
  link.appendChild(linkName);
  link.appendChild(linkUrl);
  linkName.appendChild(linkNameP);
  linkUrl.appendChild(linkUrlP);
  linkMoreBtn.appendChild(ellipsisIcon);
  linkMoreBtns.appendChild(linkModifyBtn);
  linkMoreBtns.appendChild(linkDeleteBtn);
  linkModifyBtn.appendChild(linkModifyBtnSpan);
  linkDeleteBtn.appendChild(linkDeleteBtnSpan);
  linkFormModify.addEventListener("submit", modifyLink);
  linkMoreBtn.addEventListener("click", handleLinkMoreClick);
  linkModifyBtn.addEventListener("click", linkModifyBtnClick);
  linkDeleteBtn.addEventListener("click", linkDeleteBtnClick);
  linkList.prepend(li);
}

function loadLinkState() {
  const loadedLinkState = localStorage.getItem(LINKSTATE_LS);
  if(loadedLinkState === "active") {
    paintLinks();
  } else {
    eraseLinks();
  }
}

function loadLinks() {
  const loadedLinks = localStorage.getItem(LINKS_LS);
  if(loadedLinks !== null) {
    const parsed = JSON.parse(loadedLinks);
    parsed.forEach(function(link) {
      loadLink(link.name, link.url);
    })
  }
}

function handleLinkBtnClick() {
  const loadedLinkState = localStorage.getItem(LINKSTATE_LS);
  if(loadedLinkState === "active") {
    eraseLinks();
  } else {
    paintLinks();
  }
}

function init() {
  loadLinkState();
  loadLinks();
  linkBtn.addEventListener("click", handleLinkBtnClick);
  linkForm.addEventListener("submit", addLink);
}

init();