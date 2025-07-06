particlesJS.load("particles", "config/particles.json", () => { });

/**
 * Year in the footer
 */
const yearSpan = document.getElementById("year");
const firstYear = parseInt(yearSpan.innerText);
const currentYear = (new Date()).getFullYear();
if (firstYear < currentYear) {
    yearSpan.innerText = `${firstYear} - ${currentYear}`;
}

/**
 * Fill age displays
 */
const ageDisplays = document.querySelectorAll(".age-display");
for (const ageDisplay of ageDisplays) {
    ageDisplay.innerText = getAge();
}