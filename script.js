var task = document.getElementById('activity');
var dtAtv = document.querySelector('#timeActv');
const btnCadastrar = document.querySelector('input[type=submit]');
const btnTask = document.querySelectorAll('button');
var arrayNew;
var indice = 0;

createList('open')

function addRow( name, time, act){
    
    let allListTask = document.getElementById('list')
    let newRow =  document.createElement('tr')
    let celId = document.createElement('th')
    let celAtv = document.createElement('td')
    let celData = document.createElement('td')

    celId.innerText = ++indice
    celAtv.innerText = name;
    celData.innerText = time;

    let celAct = document.createElement('td')
    let checkAct = document.createElement('select')

    array = ['Open','Done', 'Progress'];

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
            
            addRow(nameTask, timeTask, act);
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
        status: 'open'
    }

    tasks.push(newInfos);
    localStorage.setItem("listTasks", JSON.stringify(tasks));
}

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    let nameTask = task.value;
    let act = 'open';
    let newDate = new Date(dtAtv.value).toLocaleDateString('pt-br', {timeZone: 'utc'})
    
    addToLocalStorege( task.value, newDate, act); 
    addRow(nameTask, newDate, act); 
});

btnTask.forEach( button => {
    button.addEventListener('click', changeTask);
});

function changeTask(event){
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