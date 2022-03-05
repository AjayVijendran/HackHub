

let userdata = JSON.parse(localStorage.getItem("allTasks"))

document.getElementById("mybutton").onclick= function (){
    location.href="../html/edit.html"
}

function displayTasks(data) {
    htmlcode = "";
    data.forEach((value,id) => {

        if (!value.progress){
            value.progress = 0
        }
        htmlcode += `<div class = "task-widget"><p><span class = "display-hours">${value.progress}</span>/${value.time} hours of <span class = "display-task"> ${value.name}</span></p>
        </div>`
    });

    document.querySelector(".display-tasks").innerHTML = htmlcode;
            
    let allEdits = document.querySelectorAll(".edit")

    allEdits.forEach((object) => {object.addEventListener("click",editTask)})

}

displayTasks(userdata)