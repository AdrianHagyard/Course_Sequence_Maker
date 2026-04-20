let slots = document.querySelectorAll(".slot");
let draggables = document.querySelectorAll("[draggable=true]");
function initPage() {
    slots.forEach(slot => {
        slot.addEventListener("ondrop", event => {
            event.preventDefault();
            const data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
        });
        slot.addEventListener("ondragover", event => {
            event.preventDefault();
        });
    });
    draggables.forEach(draggable => {
        draggable.addEventListener("ondragstart", event => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });
}
