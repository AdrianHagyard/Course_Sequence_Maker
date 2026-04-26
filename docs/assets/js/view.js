let dropSlots = document.querySelectorAll(".slot");
let draggables = document.querySelectorAll("[draggable=true]");
let slots = document.getElementById("slotSection").querySelectorAll(".slot");

let draggingCourse = false;

function initPage() {
    dropSlots.forEach(slot => {
        slot.addEventListener("drop", drop);
        slot.addEventListener("dragover", dragOver);
    });
    slots.forEach(slot => {
        slot.addEventListener("dragenter", dragEnter);
        slot.addEventListener("dragleave", dragLeave);
    });
    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    });
}

initPage();


function dragStart(event) {
    if(event.currentTarget.classList.contains("course")) {
        event.dataTransfer.setData("courseID", event.currentTarget.id);
        draggingCourse = true;
    }
}

function dragOver(event) {
    if(hasSpace(event.currentTarget) && draggingCourse) {
        event.preventDefault();
    }
}

function drop(event) {
    if(hasSpace(event.currentTarget) && draggingCourse) {
        event.preventDefault();
        event.stopPropagation();
        const data = event.dataTransfer.getData("courseID");
        event.currentTarget.appendChild(document.getElementById(data));
        event.currentTarget.classList.remove("acceptDrop");
        updateInfoSection(event.currentTarget);
    }
    draggingCourse = false;
}

function dragEnter(event) {
    if(hasSpace(event.currentTarget) && draggingCourse) {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.add("acceptDrop");
    }
}

function dragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("acceptDrop");
}

function hasSpace(slot) {
    return (slot.children.length < slot.dataset.limit || slot.dataset.limit == -1);
}

function updateInfoSection(slot) {
    let course = slot.firstElementChild;
    let infoSection = document.getElementById("infoSection");
    infoSection.firstElementChild.textContent = course.firstElementChild.textContent;
    infoSection.lastElementChild.textContent = course.lastElementChild.textContent;
}