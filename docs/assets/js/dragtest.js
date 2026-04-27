let slots = document.querySelectorAll(".slot");
let courseListItems = document.querySelectorAll(".courseListItem");
let dragging = null;


function initPage() {
    courseListItems.forEach(item => {
        makeDraggable(item, true);
    });
}

function makeDraggable(element, source=false) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
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
            courseDescription(element);
        } else {
            //TODO if not in slot and source, delete
            //TODO if not in slot and not source, snap back to slot
            //TODO if in slot and source, delete source
            //TODO if close enough to slot, snap
            dragging.classList.remove("dragging");
            dragging = null;
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }
    
    function elementDrag(event) {
        if(!dragging) {
            dragging = createCourse(event, element);
        }
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        dragging.style.top = (dragging.offsetTop - pos2) + "px";
        dragging.style.left = (dragging.offsetLeft - pos1) + "px";
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
    course.style.position = "absolute";
    course.style.top = (event.clientY - 0.25 * course.offsetHeight) + "px";
    course.style.left = (event.clientX - 0.5 * course.offsetWidth) + "px";
    return course;
}

function courseDescription(element) {
    let id = element.firstElementChild.id;
    let title = id.slice(0, 4) + " " + id.slice(4);
    document.getElementById("title").textContent = title;
    document.getElementById("name").innerHTML = element.firstElementChild.innerHTML;
}

initPage();