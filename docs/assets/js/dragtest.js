const courseList = document.getElementById("courseList");
const courseListItems = document.querySelectorAll(".courseListItem");
let dragging = null;
let slots = document.querySelectorAll(".slot");
let test = document.getElementById("test");


function initPage() {
    let courseListItems = [];
    for(let i = 0; i < courseList.children.length; ++i) {
        courseList.children.item(i).
        courseListItems.push({})
    }
    courseListItems.forEach(item => {
        makeDraggable(item, true);
    });
    slots.forEach(slot => {
        setupSlot(slot);
    });
}

function makeDraggable(element, source=false) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let hoverSlot = null;
    let homeSlot = null;
    if(!source) {
        homeSlot = element.parentNode;
    }
    
    function mouseDown(event) {
        if(event.button !== 0) return;
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = elementCloseDrag;
        document.onmousemove = elementDrag;
    }
    
    function elementCloseDrag() {
        if(!dragging) {
            courseDescription();
        } else {
            dragging.classList.remove("dragging");
            dragging.style.top = dragging.offsetTop.toString() + "px";
            dragging.style.left = dragging.offsetLeft.toString() + "px";
            if(source) {
                if(hoverSlot) {
                    makeDraggable(dragging);
                    hoverSlot.appendChild(dragging);
                    courseList.removeChild(element);
                } else {
                    document.body.removeChild(dragging);
                }
            } else {
                if(hoverSlot) {
                    console.log("hover slot is: ", hoverSlot.id);
                    console.log("home slot is: ", homeSlot.id);
                }
                if(hoverSlot && hoverSlot != homeSlot) {
                    homeSlot.removeChild(dragging);
                    hoverSlot.appendChild(dragging);
                }
            }
            dragging = null;
            hoverSlot = null;
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }
    
    function elementDrag(event) {
        if(!dragging) {
            if(source) {
                dragging = createCourse(event, element);
            } else {
                dragging = element;
                element.classList.add("dragging");
            }
        }
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        dragging.style.top = (dragging.offsetTop - pos2) + "px";
        dragging.style.left = (dragging.offsetLeft - pos1) + "px";
        let slot = checkSlots();
        if(slot) {
            slot.classList.add("hover");
        }
        if(hoverSlot && slot != hoverSlot) {
            hoverSlot.classList.remove("hover");
        }
        hoverSlot = slot;
    }

    function courseDescription() {
        let title;
        let courseName;
        if(source) {
            let id = element.firstElementChild.id;
            title = id.slice(0, 4) + " " + id.slice(4);
            courseName = element.firstElementChild.innerHTML;
        } else {
            title = element.firstElementChild.textContent;
            courseName = element.lastElementChild.innerHTML;
        }
        document.getElementById("title").textContent = title;
        document.getElementById("name").innerHTML = courseName;
    }

    element.onmousedown = mouseDown;
}

function createCourse(event, element) {
    let course = document.createElement("div");
    course.classList.add("course", "dragging");
    let courseTitle = document.createElement("h2");
    courseTitle.classList.add("courseTitle");
    let id = element.firstElementChild.id;
    let title = id.slice(0, 4) + " " + id.slice(4);
    courseTitle.textContent = title;
    let courseName = document.createElement("p");
    courseName.innerHTML = element.firstElementChild.innerHTML;
    course.appendChild(courseTitle);
    course.appendChild(courseName);
    document.body.appendChild(course);
    course.style.top = (event.clientY - 0.25 * course.offsetHeight) + "px";
    course.style.left = (event.clientX - 0.5 * course.offsetWidth) + "px";
    return course;
}

function setupSlot(slot) {
    console.log("hi");
}

function checkSlots() {
    if(!dragging) return;
    let dragW = dragging.getBoundingClientRect().width;
    let dragH = dragging.getBoundingClientRect().height;
    let dragX = dragging.getBoundingClientRect().x;
    let dragY = dragging.getBoundingClientRect().y;

    for(let i = 0; i < slots.length; ++i) {
        let slotX = slots[i].getBoundingClientRect().x;
        let slotY = slots[i].getBoundingClientRect().y;
        let slotW = slots[i].getBoundingClientRect().width;
        let slotH = slots[i].getBoundingClientRect().height;

        if(dragX + dragW >= slotX - slotW * 0.1 && dragX <= slotX + slotW * 1.1) {
            if(dragY + dragH >= slotY - slotH * 0.1 && dragY <= slotY + slotH * 1.1) {
                return slots[i];
            }
        }
    }
    return null;
}


initPage();