//* start code javaScript file main (app.js)*
// -> select let
let $ = document;
let themeDark = false;
let timerModal = 0;
// -> select const
const body = $.querySelector("body");
const form = $.querySelector(".form");
const innerValue = $.querySelector(".input-value");
const innerDate = $.querySelector(".input-date");
const btnAdd = $.querySelector(".btn-add");
const countTodo = $.querySelector(".count-todos");
const filterTodo = $.querySelector(".filter-todo");
const btnSelectAll = $.querySelector(".btn-all");
const btnSelectComplete = $.querySelector(".btn-complete");
const btnSelectUncomplete = $.querySelector(".btn-uncomplete");
const btnSelectLiked = $.querySelector(".btn-liked");
const BtnThemeDark = $.querySelector(".theme-Dark");
const clearTodos = $.querySelector(".clear-todo");
const messageTodoList = $.querySelector(".text-message");
const dataBaseTodoList = $.querySelector(".dataBase");
const viewportUser = $.querySelector(".viewport-user");
const viewportDataBase = $.querySelector(".viewport-dataBase");
const tableData = $.querySelector(".table-data");
const sectionMainApp = $.querySelector(".app-todo");
const modal = $.querySelector(".modal-box");
const progressBar = $.querySelector(".progress-box-bar");


// list main todo list app
let todosArray = []; 


// -> check input's Form Add todo items :- processing main todo list
function checkInputsHandler (e) {
    e.preventDefault();
    // Get the time
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let second = new Date().getSeconds();

    // Get the time correct
    hour < 9 ? hour = `0${hour}` : null;
    minutes < 9 ? minutes = `0${minutes}` : null;
    second < 9 ? second = `0${second}` : null;

    let valueTodo = innerValue.value;
    let dateTodo = innerDate.value;
    let timeAddTodo = `${hour}:${minutes}:${second}`;
    
    // check input todo add 
    if (!valueTodo || !dateTodo) {
        // show error user 
        showModalErrorHandler();
    } else {
        // add todo and processing todo list add
        // Create new Data Todo
    }
}

// Make Todo Item and add to Dom 
// function makeTodoItemsHandler () {
    
// }



function showModalErrorHandler () {
    sectionMainApp.style.filter = 'blur(10px)';
    modal.classList.add("active");
    let displayProgressBar = setInterval(function () {
        timerModal++;
        progressBar.style.width = `${timerModal}%`;
        if (timerModal > 99) {
            timerModal = 0;
            progressBar.style.width = `${timerModal}%`;
            clearInterval(displayProgressBar);
            modal.classList.remove("active");
            sectionMainApp.style.filter = 'blur(0px)';
        }
    } , 50);
}


// -> Change Theme Todo List:
function changeThemeHandler () {
    // theme Dark true : Theme -> Dark => Light
    if (themeDark) {
        body.classList.remove("themeDark");
        viewportUser.classList.remove("themeDark");
        viewportDataBase.classList.remove("themeDark");
        form.classList.replace("form-control-plaintext" , "form-control");
        tableData.classList.remove("table-dark");
        themeDark = false;
    } 
    // theme Dark false : Theme -> Light => Dark
    else {
        // is Dark
        body.classList.add("themeDark");
        viewportUser.classList.add("themeDark");
        viewportDataBase.classList.add("themeDark");
        form.classList.replace("form-control" , "form-control-plaintext");
        tableData.classList.add("table-dark");
        themeDark = true;
    }
    // save data theme Dark to local storage:
    localStorage.setItem("darkMode",JSON.stringify(themeDark));
}


function loadThemeAppHandler () {
    let themeLocalStorage = JSON.parse(localStorage.getItem("darkMode"));
    if (themeLocalStorage) {
        changeThemeHandler();
    }   
}




// -> add Event Click for Theme Dark and Theme Light
BtnThemeDark.addEventListener("click",changeThemeHandler); 
window.addEventListener("load",loadThemeAppHandler);
// -> add Event Click for Todo List
btnAdd.addEventListener("click" , checkInputsHandler);