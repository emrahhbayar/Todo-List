const addButton = document.querySelector("#addButton");
const addInput = document.querySelector("#addInput");
const toDoList = document.querySelectorAll(".list-group")[0];
const firstCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const col = document.querySelector(".col-md-6");
const findInput = document.querySelector("#findInput");

let todos = [];
runEvents();

function runEvents() {
    addButton.addEventListener("click", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    firstCardBody.addEventListener("click", removeTodo);
    clearButton.addEventListener("click", clearTodo);
    findInput.addEventListener("keyup", filter);

}
function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block")
            } else {
                todo.setAttribute("style", "display : none !important");
            }
        });
    } else {
        showAlert("warning", "Filtreleme yapmak için en az bir todo olmalıdır.");
    }
}

function clearTodo() {
    //storage den silmek
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    //uı dan silmek
    const todoListItems = document.querySelectorAll(".list-group-item");

    if (todoListItems.length > 0) {
        todoListItems.forEach(function (todo) {
            todo.remove();
        });
        showAlert("success", "Tüm todolar başarıyla silindi.");
    } else {
        showAlert("warning", "Silmek için en az bir todo olmadır.");
    }

}
function removeTodo(e) {
    removeTodoToUI(e);
    removeTodoToStorage(e.target.parentElement.parentElement.textContent);

}
function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo == todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}
function removeTodoToUI(e) {
    if (e.target.className === "bi bi-x-circle-fill") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        showAlert("success", "Todo başarıyla silindi.");
    }
}
function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lütfen bir deger giriniz!")
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi.")
    }

    e.preventDefault();
}

function addTodoToUI(newTodo) {
    /*
<li class="list-group-item list-group-item-action m-1 d-flex justify-content-between align-items-center">  Todo 1
    <button class="btn btn-sm btn-danger">
         <i class="bi bi-x-circle-fill"></i>
    </button>
</li>
    */
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action m-1 d-flex justify-content-between align-items-center";
    li.textContent = newTodo;
    const button = document.createElement("button");
    button.className = "btn btn-sm btn-danger";
    const i = document.createElement("i");
    i.className = "bi bi-x-circle-fill";

    button.appendChild(i);
    li.appendChild(button);
    toDoList.appendChild(li);


    addInput.value = "";

}
function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type, message) {
    /*
    <div class="alert alert-success" role="alert">
                    A simple secondary alert—check it out!
                </div>
    */
    const div = document.createElement("div");
    div.className = "mt-4 alert alert-" + type;
    div.textContent = message;
    col.prepend(div);

    setTimeout(() => {
        div.remove();
    }, 2500);
}