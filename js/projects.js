const projectTemp = document.querySelector(".oneproject");
const projectsContainer = projectTemp.parentElement;
projectTemp.remove();

function addProjectButton(name, icon, onClick = ()=>{}) {
    const item = projectTemp.cloneNode(true);
    item.querySelector(".name").innerText = name;
    item.querySelector(".icon").style.backgroundImage = `url(${icon})`;
    projectsContainer.appendChild(item);
}

fetch("./projects.json").then(response => response.json()).then(json => {
    json.forEach(data => {
        addProjectButton(data.name, data.icon);
    });
});