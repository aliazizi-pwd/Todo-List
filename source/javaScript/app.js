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
const btnsFilterHandler = $.querySelectorAll(".select");
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
        const newTodoItem = {
            id : todosArray.length + 1,
            value : valueTodo,
            date : dateTodo,
            time : timeAddTodo,
            complete : false,
            like : false,
            status : "Waiting",
        };

        // push todo main to array
        todosArray.push(newTodoItem);


        // -> process todo list
        // 1- save todo list to local storage
        getSaveTodoLocalStorage(todosArray);
        // 2- create a new todo and append to dataBase todo list
        getCreateTodoHandler(todosArray);
    }
}



// process 1: save todo list to local storage 
function getSaveTodoLocalStorage (todosArray) {
    localStorage.setItem("TodoList",JSON.stringify(todosArray));
}

// process 2: onLoad Todo Template by localStorage and update todo list
function loadTodoListHandler () {
    // Receive data from local storage
    let receiveDataLocalStorage = JSON.parse(localStorage.getItem("TodoList"));
    todosArray = receiveDataLocalStorage;
    
    if (todosArray === null) {
        todosArray = [];
    } else {
        // set to local storage data news 
        getSaveTodoLocalStorage(todosArray);
        // create data news local storage and show to todo list dataBase
        getCreateTodoHandler(todosArray);
    }
}



// process 3: create a new todo and append to dataBase todo list
function getCreateTodoHandler (todosArray) {
    let newTemplateTodo,idTodo,valueTodo,dateTodo,timeTodo,statusTodo,activityTodo;
    let btnDone,btnTrash,btnStar;    

    // List from the beginning
    dataBaseTodoList.innerHTML = "";

    // loop items array and create todo template
    todosArray.forEach(function (todo) {
        // template todo main
        newTemplateTodo = $.createElement("tr"); 
        newTemplateTodo.className = "text-center";
        // ID todo
        idTodo = $.createElement("th");
        idTodo.dataset.scope = "row";
        idTodo.innerHTML = todo.id;
        // value todo 
        valueTodo = $.createElement("th");
        valueTodo.innerHTML = todo.value;
        // date todo
        dateTodo = $.createElement("th");
        dateTodo.innerHTML = todo.date;
        // time todo
        timeTodo = $.createElement("th");
        timeTodo.innerHTML = todo.time;
        // status todo
        statusTodo = $.createElement("th");
        statusTodo.innerHTML = todo.status;
        // activity Todo
        activityTodo = $.createElement("th");
        activityTodo.className = "action d-flex flex-row justify-content-center align-items-center gap-1";
        // button Done Todo
        btnDone = $.createElement("button");
        btnDone.className = "btn btn-success done";
        btnDone.innerHTML = `<i class="fa fa-check"></i>`;
        // button Trash Todo
        btnTrash = $.createElement("button");
        btnTrash.className = "btn btn-danger trash";
        btnTrash.innerHTML = `<i class="fa fa-trash"></i>`;
        // button Star (Like) Todo
        btnStar = $.createElement("button");
        btnStar.className = "btn btn-warning like";
        btnStar.innerHTML = `<i class="fa-regular fa-thumbs-up fa-bounce text-dark"></i>`;


        // complete box is :)
        if (todo.complete) {
            // Design change
            newTemplateTodo.className = "text-center table-success";
            // Status change
            statusTodo.innerHTML = "Completed";
        }

        // like box is :)
        if (todo.like) {
            // Design change
            newTemplateTodo.classList = "text-center table-warning";
            // Status change
            if (todo.complete) {
                statusTodo.innerHTML = "Completed/Like";
            }
        }

        // append element's 
        activityTodo.append(btnDone,btnTrash,btnStar);
        newTemplateTodo.append(idTodo,valueTodo,dateTodo,timeTodo,statusTodo,activityTodo);
        dataBaseTodoList.appendChild(newTemplateTodo); 
    });
}


// -> action button click todo list 
function actionButtonClickHandler (e) {
    // clicked button check or Done todo
    let clickedTarget = e.target;
    let partID = clickedTarget.parentElement.parentElement.firstChild.innerHTML;
    if (clickedTarget.classList.contains("done")) {
        todosArray.forEach(function (data) {
            Number(partID) === data.id ? data.complete = !data.complete : null;
        });
    } 
    // clicked button trash or remove todo 
    else if (clickedTarget.classList.contains("trash")) {
        let findIndex = todosArray.findIndex(function (data) {
            return Number(partID) === data.id;
        });

        todosArray.splice(findIndex,1);
    } 
    // clicked button like or star todo
    else if (clickedTarget.classList.contains("like")) {
        todosArray.forEach(function (data) {
            Number(partID) === data.id ? data.like = !data.like : null;
        });
    } 


    getSaveTodoLocalStorage(todosArray);
    getCreateTodoHandler(todosArray);
} 

// -> change and Filter todo
function getFilterTodoHandler (e) {
    let changed = e.target.value;
    let receiveDataLocalStorage = JSON.parse(localStorage.getItem("TodoList"));
    todosArray = receiveDataLocalStorage;
    let sortFilter;
    
    switch (changed) {
        case "All":
            sortFilter = todosArray;
            break;
        case "Complete":
            sortFilter = todosArray.filter(function (todo) {
                return todo.complete === true;
            });
            break;
        case "unComplete":
            sortFilter = todosArray.filter(function (todo) {
                return todo.complete === false;
            });
            break;   
        case "Liked":
            sortFilter = todosArray.filter(function (todo) {
                return todo.like === true;
            });
    }
    getCreateTodoHandler(sortFilter);
}



// -> button click filter todo item list dataBase Handler 
let lastClickButton = null;
let sortFilter = null;
btnsFilterHandler.forEach(function (btn) {
    btn.addEventListener("click" , function () {
        if (lastClickButton !== null) {
            lastClickButton.classList.replace("btn-warning" , "btn-primary");
            lastClickButton.classList.replace("text-dark","text-light");
        } 
        btn.classList.replace("btn-primary","btn-warning");
        btn.classList.replace("text-light","text-dark");
        lastClickButton = btn;

        sortFilter = todosArray.filter(function (todo) {
            if (btn.dataset.name === "All") {
                return todosArray;
            } else if (btn.dataset.name === "Complete") {
                return todo.complete === true;
            } else if (btn.dataset.name === "unComplete") {
                return todo.complete === false;
            } else if (btn.dataset.name === "Liked") {
                return todo.like === true;
            }
        }); 

        getCreateTodoHandler(sortFilter);
    });    
});


// show error handler
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
dataBaseTodoList.addEventListener("click",actionButtonClickHandler);
// -> add Event window and document
window.addEventListener("load",loadTodoListHandler);
// -> add Event Change
filterTodo.addEventListener("change",getFilterTodoHandler);