var task = document.getElementById('activity');
var dtAtv = document.querySelector('#timeActv');
const btnCadastrar = document.querySelector('input[type=submit]');
const btnTask = document.querySelectorAll('.options-bar button');
const selectStatus = document.querySelectorAll('.selectStatus');
const listTasks = document.querySelector('#list');

var arrayNew;
var indice = 0;

createList('Open')

function addRow( name, time, status, index, id){

    let newRow =  document.createElement('tr')
    newRow.setAttribute("id", `taskElement-${id}`);
    let celId = document.createElement('th')
    let celAtv = document.createElement('td')
    let celData = document.createElement('td')

    celId.innerText = index != "undefined" ? index : allListTask.childNodes.lenght + 1;
    celAtv.innerText = name;
    celData.innerText = time;

    let celAct = document.createElement('td')
    let checkAct = document.createElement('select')
    checkAct.classList.add("selectStatus");
    checkAct.addEventListener('change', changeStatusTask);
    array = ['Open','Done', 'Progress', 'Remove'];

    for(let i = 0; i < array.length; ++i){
        let option = document.createElement('option')
        option.value = array[i];
        option.innerHTML = array[i];
        if(array[i] == status){
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

function createList(type){
    listTasks.innerHTML = '';

    if (localStorage.hasOwnProperty("listTasks")) {
        let tasks = JSON.parse(localStorage.getItem("listTasks"));
        let filterTasks = tasks.filter( task => task.status == type);

        for(let i = 0; i < filterTasks.length; ++i){
            let nameTask = filterTasks[i].task;
            let timeTask= filterTasks[i].time;
            let status = filterTasks[i].status;
            let id = filterTasks[i].id;

            addRow(nameTask, timeTask, status, i, id);
        }
    } else{
        localStorage.setItem("listTasks", {});
    }
}

function addToLocalStorege(task, time){
    let tasks = [];

    if (localStorage.hasOwnProperty("listTasks")) {
        tasks = JSON.parse(localStorage.getItem("listTasks"))
        id = Number(tasks[tasks.length - 1].id) + 1;
    } else {
        id = 1;
    }

    let newInfos = {
        id: id,
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

    createList(targetButton);
};


function getListStorage(){
    return JSON.parse(localStorage.getItem("listTasks"));
}
function setListStorage(idElement, status){
    let newList = getListStorage();
    let index = newList.findIndex(element => element.id == idElement);
    newList[index].status = status;
    localStorage.setItem("listTasks", JSON.stringify(newList));
}

function changeStatusTask(event){
    let item = event.target;
    let row = item.closest('tr').getAttribute('id');
    let idElement = Number(row.replace("taskElement-", ""));
    let status = item.value;

    setListStorage(idElement, status);

    createList('open');

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
