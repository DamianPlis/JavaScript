let todoList =  JSON.parse(localStorage.getItem("todoList"))||[]
displayTodoList();
function addTodo() {
    console.log(todoList)

    const input1 = document.querySelector("#input")
    const input = document.querySelector("#input").value

    const date1 = document.querySelector("#date")
    const date = document.querySelector("#date").value

    if (input === "" || date === "") {
        return;
        // pokud input nebo datum je prazdne tak return zastav funkci a pokracuj mimo ni
    }
    todoList.push({
        input,
        date,
    })
    input1.value = "";
    date1.value = "";
    localStorage.setItem("todoList",JSON.stringify(todoList))
    displayTodoList();
}

function displayTodoList() {
    let todoListRenderedHTML = ""

    for (let i = 0; i < todoList.length; i++) {
        const todoNumbers = todoList[i].input
        const todoDate = todoList[i].date
        todoListRenderedHTML += `<div><p style= display:inline-block;>${todoNumbers}</p> <p style="display:inline-block;">${todoDate}</p><button class="delete-button" onclick="deleteTodo(${i})">Delete</button></div>`
    }

    document.querySelector("#insert-div").innerHTML = todoListRenderedHTML;
}

function onKeyDown(event) {
    if (event.key === "Enter") {
        addTodo();
    }
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    localStorage.setItem("todoList",JSON.stringify(todoList))
    displayTodoList();
}