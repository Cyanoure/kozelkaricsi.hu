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

fetch("./projects.json").then(response => response.json()).then(json => {
    json.forEach(data => {
        addProjectButton(data);
    });
});