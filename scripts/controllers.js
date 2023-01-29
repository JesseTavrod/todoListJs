var task = document.getElementById("activity")
var dtAtv = document.querySelector("#timeActv")
const btnCadastrar = document.querySelector("input[type=submit]")
const btnTask = document.querySelectorAll(".options-bar button")
const selectStatus = document.querySelectorAll(".selectStatus")
const listTasks = document.querySelector("#list")
var setTime;
console.log(setTime)
const blockTaksProgress = document.querySelector("#blockTaksProgress")


var stopwatchInterval;
var currentTypeStatus = "Open";

var arrayNew;
var indice = 0;

createList(currentTypeStatus);
createListProgress();

btnCadastrar.addEventListener("click", (e) => {
  e.preventDefault();
  let nameTask = task.value;
  let act = "open";
  let newDate = new Date(dtAtv.value).toLocaleDateString("pt-br", {
    timeZone: "utc",
  });

  addToLocalStorege(task.value, newDate, act);
  createList('Open');
});

for (let btn = 0; btn < btnTask.length; ++btn) {
  btnTask[btn].addEventListener("click", changeTabStatus);
}

for (let time = 0; time < setTime.length; ++time) {
  setTime[time].addEventListener("click", setTimer);
}