const body = document.querySelector("body"),
imageName = document.querySelector(".js-img-name"),
unsplash = document.querySelector(".unsplash"),
bgImageZIndexM2 = document.querySelector(".bgImage--z-index--2");

const IMG_NUMBER = 61,
CURSORPOINTER_CN = "cursor--pointer",
CURRENTIMAGESRC_LS = "current-image-src",
RANDOMIMAGE_LS = "random-image";

let RANDOMCOLOR = "";

// https://jihun04.github.io/momentun/images/

function clockRandomColor() {
    const R = genRGB();
    const G = genRGB();
    const B = genRGB();
    const A = genA();
    clockContainer.style.color = `rgba(${R}, ${G}, ${B}, ${A})`;
}

function handleUnsplashClick(event) {
    const target = event.target;
    const imageNameText = target.parentNode;
    const text = document.createElement("span");
    text.classList.add(CURSORPOINTER_CN);
    text.addEventListener("click", handleUnsplashClick);
    text.innerText = "-unsplash";
    imageNameText.appendChild(text);
    target.classList.remove(CURSORPOINTER_CN);
    target.removeEventListener("click", handleUnsplashClick);
    if(imageNameText.childElementCount === 3) {
        const R = genRGB();
        const G = genRGB();
        const B = genRGB();
        clockContainer.style.color = `rgb(${R}, ${G}, ${B})`;
        RANDOMCOLOR = `rgb(${R}, ${G}, ${B})`;
    }
    if(imageNameText.childElementCount === 4) {
        const A = genA();
        clockContainer.style.opacity = `${A}`;
    }
    if(imageNameText.childElementCount >= 5) {
        clockContainer.style.opacity = 1;
        localStorage.setItem(CLOCKCOLOR_LS, "on");
        alert("Click the clock");
    }
}

function paintImageName(src) {
    if(src == `images/1.jpg`) {
        imageName.innerText = `joel-holland`;
    }
    if(src == `images/2.jpg`) {
        imageName.innerText = `ken-cheung`;
    }
    if(src == `images/3.jpg`) {
        imageName.innerText = `marcelo-quinan`;
    }
    if(src == `images/4.jpg`) {
        imageName.innerText = `mohammad-alizade`;
    }
    if(src == `images/5.jpg`) {
        imageName.innerText = `robert-koorenny`;
    }
    if(src == `images/6.jpg`) {
        imageName.innerText = `rodion-kutsaev`;
    }
    if(src == `images/7.jpg`) {
        imageName.innerText = `sergey-pesterev`;
    }
    if(src == `images/8.jpg`) {
        imageName.innerText = `silas-baisch`;
    }
    if(src == `images/9.jpg`) {
        imageName.innerText = `alberto-restifo`;
    }
    if(src == `images/10.jpg`) {
        imageName.innerText = `alberto-restifo`;
    }
    if(src == `images/11.jpg`) {
        imageName.innerText = `ales-krivec`;
    }
    if(src == `images/12.jpg`) {
        imageName.innerText = `claudio-testa`;
    }
    if(src == `images/13.jpg`) {
        imageName.innerText = `david-marcu`;
    }
    if(src == `images/14.jpg`) {
        imageName.innerText = `jeremy-bishop`;
    }
    if(src == `images/15.jpg`) {
        imageName.innerText = `marcelo-quinan`;
    }
    if(src == `images/16.jpg`) {
        imageName.innerText = `matteo-minelli`;
    }
    if(src == `images/17.jpg`) {
        imageName.innerText = `simon-berger`;
    }
    if(src == `images/18.jpg`) {
        imageName.innerText = `ales-krivec`;
    }
    if(src == `images/19.jpg`) {
        imageName.innerText = `anders-jilden`;
    }
    if(src == `images/20.jpg`) {
        imageName.innerText = `bailey-zindel`;
    }
    if(src == `images/21.jpg`) {
        imageName.innerText = `carles-rabada`;
    }
    if(src == `images/22.jpg`) {
        imageName.innerText = `corina-ardeleanu`;
    }
    if(src == `images/23.jpg`) {
        imageName.innerText = `daniela-cuevas`;
    }
    if(src == `images/24.jpg`) {
        imageName.innerText = `dave-hoefler`;
    }
    if(src == `images/25.jpg`) {
        imageName.innerText = `davide-pietralunga`;
    }
    if(src == `images/26.jpg`) {
        imageName.innerText = `denys-nevozhai`;
    }
    if(src == `images/27.jpg`) {
        imageName.innerText = `erik-maurstad`;
    }
    if(src == `images/28.jpg`) {
        imageName.innerText = `jasper-boer`;
    }
    if(src == `images/29.jpg`) {
        imageName.innerText = `jesse-collins`;
    }
    if(src == `images/30.jpg`) {
        imageName.innerText = `johannes-plenio`;
    }
    if(src == `images/31.jpg`) {
        imageName.innerText = `josh-soto`;
    }
    if(src == `images/32.jpg`) {
        imageName.innerText = `june`;
    }
    if(src == `images/33.jpg`) {
        imageName.innerText = `kal-visuals`;
    }
    if(src == `images/34.jpg`) {
        imageName.innerText = `ken-cheung`;
    }
    if(src == `images/35.jpg`) {
        imageName.innerText = `ken-cheung`;
    }
    if(src == `images/36.jpg`) {
        imageName.innerText = `luca-bravo`;
    }
    if(src == `images/37.jpg`) {
        imageName.innerText = `lucas-ludwig`;
    }
    if(src == `images/38.jpg`) {
        imageName.innerText = `michael-busch`;
    }
    if(src == `images/39.jpg`) {
        imageName.innerText = `mostafa-meraji`;
    }
    if(src == `images/40.jpg`) {
        imageName.innerText = `nick-russill`;
    }
    if(src == `images/41.jpg`) {
        imageName.innerText = `nikhil-laddha`;
    }
    if(src == `images/42.jpg`) {
        imageName.innerText = `patrick-tomasso`;
    }
    if(src == `images/43.jpg`) {
        imageName.innerText = `pine-watt`;
    }
    if(src == `images/44.jpg`) {
        imageName.innerText = `ramiz-dedakovic`;
    }
    if(src == `images/45.jpg`) {
        imageName.innerText = `ross-stone`;
    }
    if(src == `images/46.jpg`) {
        imageName.innerText = `ryan-schroeder`;
    }
    if(src == `images/47.jpg`) {
        imageName.innerText = `sergio-franklin`;
    }
    if(src == `images/48.jpg`) {
        imageName.innerText = `sharon-mccutcheon`;
    }
    if(src == `images/49.jpg`) {
        imageName.innerText = `the-jd-darshan-solanki`;
    }
    if(src == `images/50.jpg`) {
        imageName.innerText = `timj`;
    }
    if(src == `images/51.jpg`) {
        imageName.innerText = `tobias-tullius`;
    }
    if(src == `images/52.jpg`) {
        imageName.innerText = `tobias-tullius`;
    }
    if(src == `images/53.jpg`) {
        imageName.innerText = `tyler-casey`;
    }
    if(src == `images/54.jpg`) {
        imageName.innerText = `victor-ene`;
    }
    if(src == `images/55.jpg`) {
        imageName.innerText = `viktor-darklight`;
    }
    if(src == `images/56.jpg`) {
        imageName.innerText = `vince-gx`;
    }
    if(src == `images/57.jpg`) {
        imageName.innerText = `vlad-gnatenko`;
    }
    if(src == `images/58.jpg`) {
        imageName.innerText = `vlad-hilitanu`;
    }
    if(src == `images/59.jpg`) {
        imageName.innerText = `w`;
    }
    if(src == `images/60.jpg`) {
        imageName.innerText = `william-daigneault`;
    }
    if(src == `images/61.jpg`) {
        imageName.innerText = `yong-chuan-tan`;
    }
    unsplash.addEventListener("click", handleUnsplashClick);
}

function paintImage(imgNumber) {
    const randomImage = localStorage.getItem(RANDOMIMAGE_LS);
    const image = document.createElement("div");
    let src = "";
    image.classList.add("bgImage");
    image.classList.add("bgImage--basic")
    body.prepend(image);
    if(randomImage !== "off") {
        src = `images/${imgNumber}.jpg`;
        image.style.backgroundImage = `url('${src}')`;
        bgImageZIndexM2.style.backgroundImage = `url('${src}')`;
        localStorage.setItem(CURRENTIMAGESRC_LS, src);
    } else {
        src = localStorage.getItem(CURRENTIMAGESRC_LS);
        image.style.backgroundImage = `url('${src}')`;
        bgImageZIndexM2.style.backgroundImage = `url('${src}')`;
    }
    paintImageName(src);
}

function genRamdom() {
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRamdom();
    paintImage(randomNumber);
}

init();