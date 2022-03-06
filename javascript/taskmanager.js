

let userdata = JSON.parse(localStorage.getItem("allTasks"))

document.getElementById("mybutton").onclick= function (){
    location.href="../html/edit.html"
}

let running = {};


function displayTasks(data) {
    htmlcode = "";
    lhtmlcode = "";
    data.forEach((value,id) => {

        if (!value.progress){
            value.progress = 0;
        }
        if (value.completed){
            lhtmlcode += `<div class = "complete-widget"><p>${value.time} hours of <span class = "display-task"> ${value.name}</span></p>
            </div>`
        }
        else{
            htmlcode += `<div class = "task-widget" id = ${id}><p class = ${value.time}><span class = "display-hours">${value.progress}</span>/${value.time} hours of <span class = "display-task"> ${value.name}</span></p>
            <div class="progress">
            <div class="progress__fill"></div>
            <span class="progress__text">0%</span>
            </div>
            <button class = "control"> Resume </button>
            </div>`
        }
        
    });

    

    document.querySelector(".display-tasks").innerHTML = htmlcode;

    document.querySelector(".completed-tasks").innerHTML = lhtmlcode;

    document.querySelectorAll(".control").forEach((object) => {object.addEventListener("click",function(eve) {

       
        if (running){
            running = {};
            console.log("Running has been stopped");
        }
        let sameself = eve.currentTarget.classList.contains("active");

        if (!sameself){
            startTimer(eve)
        }
        
    })});

    document.querySelectorAll(".task-widget").forEach((obj) => {
        let userdata = JSON.parse(localStorage.getItem("allTasks"));
        let idd = Number(obj.id);

        let p = userdata[idd].progress;
        let t = userdata[idd].time
        console.log(obj);
        updateProgressBar(obj.querySelector(".progress"),((p/t))*100);
    })
            
}

displayTasks(userdata)


 


async function startTimer(event){
    let obj = event.currentTarget;
    obj.classList.add("active");
    obj.textContent = "Pause";

    let task = obj.parentElement;
    let progressbar = task.querySelector(".progress");
    let para = task.querySelector("p");
    let time = Number(para.className);
    let update = para.querySelector(".display-hours");
    running[task.id] = true;

    let userdata = JSON.parse(localStorage.getItem("allTasks"));
    
    let total = time*60*60; //need to retrieve from database
    let timeleft = total - userdata[task.id].progress*60*60;

    console.log(total);
    console.log(timeleft);
    let delay = ms => new Promise(res => setTimeout(res, ms));
    while (timeleft >= 0 && running[task.id]) {
        
        let m = ((timeleft/total));
        update.textContent = ((1-m)*time).toFixed(2);
        updateProgressBar(progressbar,((1-m)*100));
        timeleft -= 1 ;
        console.log(timeleft);
        await delay(1000);
    }
    obj.classList.remove("active");
    obj.textContent = "Resume";
    console.log(timeleft/(60*60)); //remaining time left must be updated to database
    
    if (timeleft <= 0){
        userdata[task.id]["completed"] = true;
        userdata[task.id]["progress"] = total;
        displayTasks(userdata);
        
    }
    else{
        userdata[task.id]["progress"] = total - (timeleft/(60*60));
        console.log(userdata[task.id]["progress"]);
    }

    
    localStorage.setItem('allTasks',JSON.stringify(userdata));
    
}

function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
  }
  

  