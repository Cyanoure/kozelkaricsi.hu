const bannerElem = document.getElementById("banner");

function getBannerTexts() {
    const newBannerTexts = [
        { text: "Üdvözöllek!", duration: 5 },
        { text: "Nyugodtan nézz körül :)", duration: 3 },
        { text: `${getAge()} éves programozó vagyok`, duration: 3 },
        { text: `info@${document.location.hostname}`, duration: 5 },
        { text: "Na még egy szöveg hogy legyen valami tartalom :'D", duration: 3 },
        { text: "Olvasod egyáltalán ezt?", duration: 1 }
    ];
    return newBannerTexts;
}

let erasing = false;
let writing = true;
let waiting = 5;
let bannerContent = bannerElem.innerHTML;
let bannerTextIndex = 0;
let currentText = getBannerTexts()[0];
let framerate = 10;

function erase() {
    bannerContent = bannerContent.substring(0, bannerContent.length - 1);
}

function type() {
    bannerContent = currentText.text.substring(0, bannerContent.length + 1);
}

setInterval(() => {
    if (erasing) {
        if (bannerContent.length > 1) {
            erase();
            if (bannerContent[bannerContent.length - 1] === " ") {
                erase();
            }
        } else {
            bannerContent = "";
            erasing = false;
            writing = true;
        }
    } else if (writing) {
        if (bannerContent.length < currentText.text.length) {
            type();
            if (bannerContent[bannerContent.length - 1] === " ") {
                type();
            }
        } else {
            writing = false;
            waiting = currentText.duration;
        }
    } else if (waiting > 0) {
        waiting -= 1 / framerate;
    } else {
        const texts = getBannerTexts();
        bannerTextIndex = (bannerTextIndex + 1) % texts.length;
        currentText = texts[bannerTextIndex];
        erasing = true;
    }
    if (bannerElem.innerText !== bannerContent) {
        bannerElem.innerText = bannerContent;
    }
}, 1000 / framerate);