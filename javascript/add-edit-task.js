const widget_tasknames = document.querySelector(".task-name");
const widget_hours = document.querySelector(".hours");
const task_add=document.querySelector(".add");
const task_remove=document.querySelector(".remove")





task_add.addEventListener("click",appendTask);
task_remove.addEventListener("click",removeTask);


function displayTasks(data) {
    htmlcode = "";
    data.forEach((value,id) => {
        htmlcode += `<div class = "task-widget"><p><span class = "display-hours">${value.time}</span> hours of <span class = "display-task"> ${value.name}</span></p>
        <button id = ${id} class = "edit">Edit</button></div>`
        
    });

    document.querySelector(".task-display").innerHTML = htmlcode;

}


function appendTask(eventObj) {

    let triggerObj = eventObj.currentTarget;
    let taskObj = triggerObj.parentElement;
    let hours = taskObj.querySelector(".hours").value.trim();
    let task = taskObj.querySelector(".task-name").value.trim();
    if  (hours && task){
        let userdata = JSON.parse(localStorage.getItem("allTasks"));
        if (!userdata){
            userdata = []; //Initialize empty list if no data is present
        }

        let taskInfo = {name: task, time: hours};
        userdata.push(taskInfo);
        localStorage.setItem('allTasks',JSON.stringify(userdata)); //update userdata

        displayTasks(userdata)
    }

}
function removeTask(){
    /*do malpraktise to remove tasks */
}
