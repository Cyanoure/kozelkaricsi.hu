const projectTemp = document.querySelector(".oneproject");
const projectsContainer = projectTemp.parentElement;
projectTemp.remove();

function addProjectButton(data, onClick = ()=>{}) {
    const item = projectTemp.cloneNode(true);
    item.querySelector(".name").innerText = data.name;
    item.querySelector(".icon").style.backgroundImage = `url(${data.icon})`;
    item.href = data.url;
    projectsContainer.appendChild(item);
    item.title = data.description;
}

(async () => {
    let result;
    let json;
    try {
        if (document.location.hash === "#test") {
            throw new Error("Test mode.");
        }
        result = await fetch("https://raw.githubusercontent.com/Cyanoure/kozelkaricsi.hu/refs/heads/main/html/projects.json");
        json = await result.json();
    } catch(e) {
        result = await fetch("./projects.json");
        json = await result.json();
    }
    for (const data of json) {
        addProjectButton(data);
    }
})();
