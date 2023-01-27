var task = document.getElementById('activity');
var dtAtv = document.querySelector('#timeActv');
const btnCadastrar = document.querySelector('input[type=submit]');
const btnTask = document.querySelectorAll('.options-bar button');
const selectStatus = document.querySelectorAll('.selectStatus');

var arrayNew;
var indice = 0;

createList('open')

function addRow( name, time, act, index){
    let allListTask = document.getElementById('list')
    let newRow =  document.createElement('tr')
    newRow.setAttribute("id", `taskElement-${index}`);
    let celId = document.createElement('th')
    let celAtv = document.createElement('td')
    let celData = document.createElement('td')

    celId.innerText = index;
    celAtv.innerText = name;
    celData.innerText = time;

    let celAct = document.createElement('td')
    let checkAct = document.createElement('select')
    checkAct.classList.add("selectStatus");

    checkAct.addEventListener('change', setStatusTask);

    array = ['Open','Done', 'Progress', 'Remove'];

    for(let i = 0; i < array.length; ++i){
        let option = document.createElement('option')
        option.value = array[i];
        option.innerHTML = array[i];
        checkAct.appendChild(option);
    }

    newRow.appendChild(celId);
    newRow.appendChild(celAtv);
    newRow.appendChild(celData);
    newRow.appendChild(celAct);
    newRow.appendChild(checkAct);
    allListTask.appendChild(newRow);

}

function createList(){
    if (localStorage.hasOwnProperty("listTasks")) {
        let tasks = JSON.parse(localStorage.getItem("listTasks"));

        for(let i = 0; i < tasks.length; ++i){
            let nameTask = tasks[i].task;
            let timeTask= tasks[i].time;
            let act = tasks[i].status;

            if(act == "open"){
                addRow(nameTask, timeTask, act, i);
            }


        }
    }
}

function addToLocalStorege(task, time){
    let tasks = [];

    if (localStorage.hasOwnProperty("listTasks")) {
        tasks = JSON.parse(localStorage.getItem("listTasks"))
    }
    
    let newInfos = {
        task: task,
        time: time,
        status: 'open',
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    tasks.push(newInfos);
    localStorage.setItem("listTasks", JSON.stringify(tasks));
}

function changeTabStatus(event){
    let targetButton = event.target.getAttribute('target');
    let i;
    
    for(i = 0; i < btnTask.length; ++i){
        if(btnTask[i].getAttribute('target') == targetButton){
            btnTask[i].classList.add('active')
        } else {
            btnTask[i].classList.remove('active')
        }
    }
};

function getListStorage(){
    return JSON.parse(localStorage.getItem("listTasks"));
}

function setStatusTask(event){
    let item = event.target;
    let row = item.closest('tr').getAttribute('id');
    let idRow = Number(row.replace("taskElement-", ""));
    let list = document.querySelectorAll('#list tr');
    list[idRow].remove();
    console.log(item.value)
    list = getListStorage();
    list[idRow].status = item.value;
    localStorage.setItem("listTasks", JSON.stringify(list));

}


btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    let nameTask = task.value;
    let act = 'open';
    let newDate = new Date(dtAtv.value).toLocaleDateString('pt-br', {timeZone: 'utc'})
    
    addToLocalStorege( task.value, newDate, act); 
    addRow(nameTask, newDate, act); 
});


for(let btn = 0; btn < btnTask.length; ++btn){
    btnTask[btn].addEventListener('click', changeTabStatus);
}
