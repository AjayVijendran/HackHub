

let userdata = JSON.parse(localStorage.getItem("allTasks"))

document.getElementById("mybutton").onclick= function (){
    location.href="../html/edit.html"
}

let running = {};


function displayTasks(data) {
    htmlcode = "";
    data.forEach((value,id) => {

        if (!value.progress){
            value.progress = 0
        }
        htmlcode += `<div class = "task-widget" id = ${id}><p class = ${value.time}><span class = "display-hours">${value.progress}</span>/${value.time} hours of <span class = "display-task"> ${value.name}</span></p>
        <div class="progress">
        <div class="progress__fill"></div>
        <span class="progress__text">0%</span>
        </div>
        <button class = "control"> Resume </button>
        </div>`
    });

    

    document.querySelector(".display-tasks").innerHTML = htmlcode;

    document.querySelectorAll(".control").forEach((object) => {object.addEventListener("click",function(eve) {

        let self_id = eve.currentTarget.parentElement.id;
        if (running[self_id]){
            running[self_id] = false;
            console.log("Running has been stopped");
        }
        let sameself = eve.currentTarget.classList.contains("active");

        if (!sameself){
            startTimer(eve)
        }
        
    })});
            
}

displayTasks(userdata)


const delay = ms => new Promise(res => setTimeout(res, ms)); 


async function startTimer(event){
    let obj = event.currentTarget;
    obj.classList.add("active");
    obj.textContent = "Pause";

    let task = obj.parentElement;
    let progressbar = task.querySelector(".progress");
    let time = Number(task.querySelector("p").className);
    running[task.id] = true;
    let timeleft = time*60*60;
    let total = time*60*60; //need to retrieve from database
    while (timeleft && running[task.id]) {
        await delay(1000);
        updateProgressBar(progressbar,(1-(timeleft/total))*100);
        timeleft -= 1 
    }
    obj.classList.remove("active");
    obj.textContent = "Resume";

    console.log(timeleft/(60*60)); //remaining time left must be updated to database

    
}

function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
  }
  

  