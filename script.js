var atividade = document.getElementById('atividade');
var dtAtv = document.querySelector('#dataAtv');
var btnCadastrar = document.querySelector('input[type=submit]');
var indice = 0;

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault(); 

    let lista = document.getElementById('lista');
    console.log('teste')

    let linha =  document.createElement('tr');
    
    let celId = document.createElement('th');
    celId.innerText = ++indice;

    let celAtv = document.createElement('td');
    celAtv.innerText = atividade.value;


    let celData = document.createElement('td');
    let dataFormata = new Date(dtAtv.value).toLocaleDateString('pt-br', {timeZone: 'utc'})
    celData.innerText = dataFormata;

    let celAct = document.createElement('td');
    let checkAct = document.createElement('input')
    checkAct.type = 'checkbox';
    checkAct.id = 'atv'+indice;
    

    celAct.appendChild(checkAct);
    linha.appendChild(celId);
    linha.appendChild(celAtv);
    linha.appendChild(celData);
    linha.appendChild(celAct);
    lista.appendChild(linha);

    checkAct.addEventListener('change', () => {

        let resposta = confirm('Deseja mesmo???');
        
        if(resposta) {
            linha.style.textDecoration = 'line-through';
        } else{
            linha.style.textDecoration = 'none';
        }
       
    });
});

