function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragStop(event) {
    event.preventDefault();
}

function dragDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}