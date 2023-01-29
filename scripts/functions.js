function addRow(name, time, status, index, id) {
  let newRow = document.createElement("tr");
  newRow.setAttribute("id", `taskElement-${id}`);
  let celId = document.createElement("th");
  let celAtv = document.createElement("td");
  let celData = document.createElement("td");

  celId.innerText =
    index != "undefined" ? index : allListTask.childNodes.lenght + 1;
  celAtv.innerText = name;
  celData.innerText = time;

  let celAct = document.createElement("td");
  let checkAct = document.createElement("select");
  checkAct.classList.add("selectStatus");
  checkAct.addEventListener("change", changeStatusTask);
  array = ["Open", "Done", "Progress", "Remove"];

  for (let i = 0; i < array.length; ++i) {
    let option = document.createElement("option");
    option.value = array[i];
    option.innerHTML = array[i];
    if (array[i] == status) {
      option.selected = true;
    }
    checkAct.appendChild(option);
  }

  newRow.appendChild(celId);
  newRow.appendChild(celAtv);
  newRow.appendChild(celData);
  newRow.appendChild(celAct);
  newRow.appendChild(checkAct);
  listTasks.appendChild(newRow);
}

function createListProgress(){
  let tasks = JSON.parse(localStorage.getItem("listTasks"));
  console.log(tasks);

  if(tasks.length > 0){
    console.log('teste');

    let filterTasksProgress = tasks.filter((task) => task.status == "Progress");

    console.log(filterTasksProgress);
  
    for (let i = 0; i < filterTasksProgress.length; ++i) {
      createRow = document.createElement("div")
      createRow.setAttribute("class",`row-task`)
      createRow.setAttribute("id",`newProgress-${filterTasksProgress[i].id}`)
      
      let name = filterTasksProgress[i].task;
      let hours = filterTasksProgress[i].hours;
      let minutes = filterTasksProgress[i].minutes;
      let seconds = filterTasksProgress[i].seconds;
  
      let createRowHtml = `<div class="nameTask"> ${ name } </div>
        <div class="timer">
          <span class="hours">${ hours }</span> : 
          <span class="minutes">${ minutes }</span> :
          <span class="seconds">${ seconds }</span>
        </div>
        <div class="setTime">
          <button class="stopTask" target="stopTask">Stop</button>
          <button class="startTask" target="startTask">Start</button>
          <button class="doneTask" target="doneTask">Done</button>
        </div>`;
      
      createRow.innerHTML = createRowHtml;

      blockTaksProgress.appendChild(createRow);
    } 

    setTime = document.querySelectorAll(".setTime button");
  }
  
}

function createList(type) {
  listTasks.innerHTML = "";
  console.log(type);

  if (localStorage.hasOwnProperty("listTasks")) {
    if(localStorage.getItem("listTasks")){
      let tasks = JSON.parse(localStorage.getItem("listTasks"));
      let filterTasks = tasks.filter((task) => task.status == type);

      for (let i = 0; i < filterTasks.length; ++i) {
        let nameTask = filterTasks[i].task;
        let timeTask = filterTasks[i].time;
        let status = filterTasks[i].status;
        let id = filterTasks[i].id;
  
        addRow(nameTask, timeTask, status, i, id);
      }
    }
  }
}

function changeStatusTask(event) {
  let item = event.target;
  let row = item.closest("tr").getAttribute("id");
  let idElement = Number(row.replace("taskElement-", ""));
  let status = item.value;
  setListStorage(idElement, status);

  createList(currentTypeStatus);
}

function changeTabStatus(event) {
  let targetButton = event.target.getAttribute("target");
  let i;
  currentTypeStatus = targetButton;

  for (i = 0; i < btnTask.length; ++i) {
    if (btnTask[i].getAttribute("target") == targetButton) {
      btnTask[i].classList.add("active");
    } else {
      btnTask[i].classList.remove("active");
    }
  }

  createList(targetButton);
}

// LocalStorage
function addToLocalStorege(task, time) {
  let tasks = [];

  if (localStorage.hasOwnProperty("listTasks")) {
    tasks = JSON.parse(localStorage.getItem("listTasks"));
    id = Number(tasks[tasks.length - 1].id) + 1;
  } else {
    id = 1;
  }

  let newInfos = {
    id: id,
    task: task,
    time: time,
    status: "Open",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  tasks.push(newInfos);
  localStorage.setItem("listTasks", JSON.stringify(tasks));
  
}

function getListStorage() {
  return JSON.parse(localStorage.getItem("listTasks"));
}

function setListStorage(idElement, status) {
  let newList = getListStorage();
  let index = newList.findIndex((element) => element.id == idElement);
  newList[index].status = status;

  localStorage.setItem("listTasks", JSON.stringify(newList));
}
// LocalStorage

// Timer
function setTimer(event) {
  target = event.target.getAttribute("target");
  switch (target) {
    case "stopTask":
      stopwatch('stop', event);
    break;
    case "startTask":
      stopwatch('start', event);
    default:
  }
}

function stopwatch(type, event) {
  let rowClick = event.target.closest('.row-task');
  let targetClick = rowClick.getAttribute('id') 

  
  let hours = document.querySelector(`#${targetClick} .hours`);
  let minutes = document.querySelector(`#${targetClick} .minutes`);
  let seconds = document.querySelector(`#${targetClick} .seconds`);
  let zeroAdd = "0";
  let timeMinutes;
  let timeSeconds;


 
  if(type === "start"){
    targetClick = setInterval(() => {
      timeSeconds = Number(seconds.innerText);
  
      if (timeSeconds == 59) {
        timeMinutes = Number(minutes.innerText);
        seconds.innerText = "00";
  
        if (timeMinutes == 59) {
          minutes.innerText = "00";
          Number(hours.innerText) < 10 ? (zeroAdd = "0") : (zeroAdd = "");
          hours.innerText = zeroAdd + (Number(hours.innerText) + 1);
        } else {
          Number(minutes.innerText) < 10 ? (zeroAdd = "0") : (zeroAdd = "");
          newNumber = Number(minutes.innerText) + 1;
          minutes.innerText = zeroAdd + newNumber;
        }
      } else {
        Number(seconds.innerText) < 10 ? (zeroAdd = "0") : (zeroAdd = "");
        newNumber = Number(seconds.innerText) + 1;
        seconds.innerText = zeroAdd + newNumber;
      }
    }, 1000);
    
  } else {
    clearInterval(targetClick)
  }
}


