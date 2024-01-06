//* start code javaScript file main (app.js)*
// -> select let
let $ = document;
let themeDark = false;
// -> select const
const body = $.querySelector("body");
const form = $.querySelector(".form");
const innerValue = $.querySelector(".input-value");
const innerDate = $.querySelector(".input-date");
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




// -> add Event Click and...:
BtnThemeDark.addEventListener("click",changeThemeHandler); 
window.addEventListener("load",loadThemeAppHandler);