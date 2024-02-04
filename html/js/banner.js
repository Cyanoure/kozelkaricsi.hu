const bannerElem = document.getElementById("banner");

/**
 * "getAge()" function miatt function-be raktam a szövegek lekérését,
 * hogy mindig friss adatot mutasson, az oldal frissítése nélkül is.
 * Csak egy kis apróság.
 */
function getBannerTexts() {
    const newBannerTexts = [
        { text: "Üdvözöllek!", duration: 5000 },
        { text: "Nyugodtan nézz körül :)", duration: 3000 },
        { text: `${getAge()} éves programozó vagyok`, duration: 3000 },
        { text: `info@kozelkaricsi.hu`, duration: 5000 },
        { text: "Na még egy szöveg hogy legyen valami tartalom :D", duration: 3000 },
        { text: "Olvasod egyáltalán ezt?", duration: 1000 }
    ];
    return newBannerTexts;
}

let state = "writing";
let bannerContent = bannerElem.innerHTML;
let bannerTextIndex = 0;
let currentText = getBannerTexts()[0];
let framerate = 10;

/**
 * Szöveg törlése karakterenként.
 * Minden hívás egy frame lépés.
 * @returns Visszaadja az éppen törölt karaktert. 'null' ha nincs.
 */
function erase() {
    const currentLength = bannerContent.length;
    if (currentLength > 0) {
        const deletedCharacter = bannerContent[currentLength - 1];
        bannerContent = bannerContent.substring(0, currentLength - 1);
        return deletedCharacter;
    }
    return null;
}

/**
 * Szöveg beszúrása karakterenként.
 * Minden hívás egy frame lépés.
 * @returns Visszaadja a beszúrt karaktert. 'null' ha nincs.
 */
function type() {
    const textLength = currentText.text.length;
    const currentLength = bannerContent.length;
    if (currentLength < textLength) {
        bannerContent = currentText.text.substring(0, currentLength + 1);
        return bannerContent[currentLength];
    }
    return null;
}

/**
 * Frissíti a megjelenített szöveget.
 */
function updateText() {
    bannerElem.innerText = bannerContent;
}

/**
 * Aszinkron segédfüggvény a várakozásra.
 * @param {number} ms - Várakozás ennyi ezred milliszekundumig.
 */
async function wait(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Következő szövegre lép.
 */
function nextText() {
    const texts = getBannerTexts();
    bannerTextIndex = (bannerTextIndex + 1) % texts.length;
    currentText = texts[bannerTextIndex];
}

/**
 * Banner animáció következő képkockája.
 */
async function step() {
    switch (state) {
        case "writing":
            const lastCharacterWritten = type();
            if (lastCharacterWritten === null) {
                state = "waiting";
                await wait(currentText.duration);
                state = "erasing";
                updateText();
                step();
                break;
            }
            if (lastCharacterWritten !== " ") {
                await wait(1000 / framerate);
            }
            updateText();
            step();
            break;
        case "erasing":
            const lastCharacterDeleted = erase();
            if (lastCharacterDeleted !== " ") {
                await wait(1000 / framerate);
            }
            if (lastCharacterDeleted === null) {
                state = "writing";
                nextText();
            }
            updateText();
            step();
            break;
        default:
            console.error("HIBA!");
            break;
    }
};

step();