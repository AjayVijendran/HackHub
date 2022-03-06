/*
TO DO: Limit sum total of hours to 20
*/
//Manage tasks button (Front-end)

/* Onclick, redirect to another page. 
(Each task has an unique id)
Current Tasks 
[2hrs of Javascript Learning, editButton]*/

/*Each editButton will be linked with the task id

On click of edit button beside already existing task

[Time: <fill> , Task: <name> , saveButton, trashButton]

Suppose addButton is clicked,

[Time: <fill> , Task: <name> , saveButton, trashButton] (directly delete)*/


//Manage Database (Backend)

/* saveButton onclick function 
update data in database */

const widget_tasknames = document.querySelector(".task-name");
const widget_hours = document.querySelector(".hours");
const addtaskb = document.querySelector(".Add-Task")




addtaskb.addEventListener("click",displayAdd);

function displayAdd(event){

    let buttonb = event.currentTarget;
    buttonb.disabled = true;
    let display = document.querySelector(".task-display");
    let obj = document.createElement("div");
    display.appendChild(obj)
    htmlcode = `<input type="number" min = "0" max = "24" placeholder="n" class="hours"> 
    <p>hours</p>
    <input type="text" maxlength="32" class="task-name" placeholder="Enter Task Name">
    <button class = "add">+</button>
    <button class = "cancel" > - </button>`
    obj.innerHTML= htmlcode;
    obj.querySelector(".add").addEventListener("click", function(eve) {
        buttonb.disabled = false;
        appendTask(eve)});
    obj.querySelector(".cancel").addEventListener("click", function() {
        buttonb.disabled = false;
        obj.remove()})
}


function displayTasks(data) {
    htmlcode = "";
    data.forEach((value,id) => {
        htmlcode += `<div class = "task-widget"><p><span class = "display-hours">${value.time}</span> hours of <span class = "display-task"> ${value.name}</span></p>
        <button id = ${id} class = "edit">Edit</button></div>`
    });

    document.querySelector(".task-display").innerHTML = htmlcode;
            
    let allEdits = document.querySelectorAll(".edit")

    allEdits.forEach((object) => {object.addEventListener("click",editTask)})

}

let d = JSON.parse(localStorage.getItem("allTasks"));
if (d){
    displayTasks(d) //Upon loading the page, immediately load user's current tasks
}
else{
    document.querySelector(".task-display").innerHTML = "<p> You currently have no tasks! </p>";
}



function appendTask(eventObj) {

    console.log("Malprajtise works!")

    let triggerObj = eventObj.currentTarget;
    let taskObj = triggerObj.parentElement;
    let hours = taskObj.querySelector(".hours").value.trim();
    let task = taskObj.querySelector(".task-name").value.trim();

    if (hours && task){
        let userdata = JSON.parse(localStorage.getItem("allTasks"));
        if (!userdata){
            userdata = []; //Initialize empty list if no data is present
        }

        let taskInfo = {name: task, time: hours, completed: false, progress: 0};
        userdata.push(taskInfo);
        localStorage.setItem('allTasks',JSON.stringify(userdata)); //update userdata

        displayTasks(userdata)

    }
}


function editTask(eventObj) {
    console.log(eventObj.currentTarget.id)
    let triggerObj = eventObj.currentTarget;
    let idd = triggerObj.id;
    let taskObj = triggerObj.parentElement;
    let time = taskObj.querySelector(".display-hours").textContent; //access value of <span>
    let taskname = taskObj.querySelector(".display-task").textContent;
    let temphtml = `<input type="number" min = "0" max = "24" placeholder="n" class="hours" value = "${time}"> 
    <p>hours</p>
    <input type="text" maxlength="20" class="task-name" placeholder="Enter Task Name" value = "${taskname}">
    <button class = "add" >+</button>
    <button class = "remove" > - </button>`;
    taskObj.innerHTML = temphtml;
    let updatebutton = taskObj.querySelector(".add");
    updatebutton.addEventListener("click",function() {
        let newTime = taskObj.querySelector(".hours").value.trim();
        let newTask = taskObj.querySelector(".task-name").value.trim();
        appendUpdateTask(taskObj,idd,newTime,newTask)});

    let removebutton = taskObj.querySelector(".remove");
    removebutton.addEventListener("click", function() {
        let userdata = JSON.parse(localStorage.getItem("allTasks"));
        userdata.splice(idd,1);
        localStorage.setItem('allTasks',JSON.stringify(userdata)); 
        displayTasks(userdata);
    })
}

function appendUpdateTask(obj,idd,newTime,newTask) {
    let userdata = JSON.parse(localStorage.getItem("allTasks"));
    userdata[idd] = {name: newTask, time: newTime};
    localStorage.setItem('allTasks',JSON.stringify(userdata)); 
    displayTasks(userdata);
}

