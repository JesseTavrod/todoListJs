var atividade = document.getElementById('activity');
var dtAtv = document.querySelector('#timeActv');
const btnCadastrar = document.querySelector('input[type=submit]');
const btnTask = document.querySelectorAll('button');

var indice = 0;

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    let lista = document.getElementById('list')
    let linha =  document.createElement('tr')
    let celId = document.createElement('th')
    celId.innerText = ++indice

    let celAtv = document.createElement('td')
    celAtv.innerText = atividade.value;


    let celData = document.createElement('td')
    let dataFormata = new Date(dtAtv.value).toLocaleDateString('pt-br', {timeZone: 'utc'})
    celData.innerText = dataFormata

    let celAct = document.createElement('td')
    let checkAct = document.createElement('select')

    array = ['Done', 'Progress'];

    for(let i = 0; i < array.length; ++i){
        let option = document.createElement('option')
        option.value = array[i];
        option.innerHTML = array[i];
        checkAct.appendChild(option);
    }

    checkAct.id = 'atv'+indice;

    celAct.appendChild(checkAct);
    linha.appendChild(celId);
    linha.appendChild(celAtv);
    linha.appendChild(celData);
    linha.appendChild(celAct);
    lista.appendChild(linha);

});

btnTask.forEach( button => {
    button.addEventListener('click', changeTask);
});

function changeTask(vent){
    let button = event.target;
    
    if(!button.classList.contains("active")){
        button.classList.add('active');
    }
    
};