

//Manage tasks button (Front-end)

/* Onclick, redirect to another page. 
(Each task has an unique id)
Current Tasks 
[2hrs of Javascript Learning, editButton]*/

document.getElementById("mybutton").onclick= function (){
    location.href="../html/edit.html"
}

/*Each editButton will be linked with the task id

On click of edit button beside already existing task

[Time: <fill> , Task: <name> , saveButton, trashButton]

Suppose addButton is clicked,

[Time: <fill> , Task: <name> , saveButton, trashButton] (directly delete)*/


//Manage Database (Backend)

/* saveButton onclick function 
update data in database */