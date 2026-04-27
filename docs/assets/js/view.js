let termList = {};
let courseListItems = [];
let draggingCourse = false;

function initPage() {
    let terms = document.querySelectorAll(".term");
    terms.forEach(term => {
        let termName = term.id;
        termList[termName] = [];
        for(let i = 0; i < term.childElementCount; ++i) {
            termList[termName].push(term.children.item(i));
            // term.children.item(i).addEventListener("drop", drop);
            // term.children.item(i).addEventListener("dragOver", dragOver);
            // term.children.item(i).addEventListener("dragEnter", dragEnter);
            // term.children.item(i).addEventListener("dragLeave", dragLeave);
        }
    });
    let courseLists = document.getElementsByTagName("li");
    for(let i = 0; i < courseLists.length; ++i) {
        courseListItems.push(courseLists.item(i));
        courseLists.item(i).addEventListener("mousedown", dragStart);
    }
}

initPage();

function dragStart(event) {
    
    event.dataTransfer.setData("courseID", event.currentTarget.id);
    draggingCourse = true;
    // console.log("start dragging");
    // console.log("\t", event.dataTransfer.getData("courseID"));
}

// function dragOver(event) {
//     if(hasSpace(event.currentTarget) && draggingCourse) {
//         event.preventDefault();
//     }
// }

// function drop(event) {
//     if(hasSpace(event.currentTarget) && draggingCourse) {
//         event.preventDefault();
//         event.stopPropagation();
//         const data = event.dataTransfer.getData("courseID");
//         event.currentTarget.appendChild(document.getElementById(data));
//         event.currentTarget.classList.remove("acceptDrop");
//         updateInfoSection(event.currentTarget);
//     }
//     draggingCourse = false;
// }

// function dragEnter(event) {
//     if(hasSpace(event.currentTarget) && draggingCourse) {
//         event.preventDefault();
//         event.stopPropagation();
//         event.currentTarget.classList.add("acceptDrop");
//     }
// }

// function dragLeave(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     event.currentTarget.classList.remove("acceptDrop");
// }

