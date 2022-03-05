const widget_tasknames = document.querySelector("#task-name");
const widget_hours = document.querySelector("#hours");


let userdata = JSON.parse(localStorage.getItem("allTasks"));


widget_tasknames.addEventListener("keyup",appendTask);
widget_hours.addEventListener("keyup",appendTask);


function appendTask(eventObj) {

    let triggerObj = eventObj.currentTarget;
}
