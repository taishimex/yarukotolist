
var todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// const filterOptcion = document.querySelector(".filter-todo");

//Event Listenr

//Function
function addTodo(event) {

    event.preventDefault();

    //todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI -> Input accion
    const newTodo = document.createElement("input");    
    newTodo.value = todoInput.value;
    newTodo.disabled = true;
    newTodo.classList.add('todo-item');
    newTodo.type ='text';

    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    //Editar 
    const editarButton = document.createElement('button');
    editarButton.innerHTML = '<i class="fas fa-edit"></i>';
    editarButton.classList.add("editar-btn");
    todoDiv.appendChild(editarButton); 

    //check mark bottun
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //check trash bottun
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // console.log(todoDiv);

    todoInput.value = '';
}

todoButton.addEventListener('click', addTodo);

//Function
function deleteCheck(e) {
    
    const item = e.target;
    
    // delete to do
    if (item.classList[0] === "trash-btn") {

        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);

        //Animation
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });        
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        // console.log(item);
        const todo = item.parentElement;
        todo.classList.toggle("completed");    
    }
}

todoList.addEventListener('click', deleteCheck);

function editar(e) 
{    
    const item = e.target;
    
    // editar
    if (item.classList[0] === "editar-btn") 
    {
        const todo = item.parentElement; 
        const firstTodo = todo.firstChild;
        firstTodo.disabled = !firstTodo.disabled;
        
        // console.log(item);
        // console.log(todo); 
        // console.log(todo.firstChild);
        
    }
}

todoList.addEventListener('click', editar);


// filterOptcion.addEventListener('click', filterTodo);

// function filterTodo(e) {
//     const todos = todoList.childNodes;

//     todos.forEach(function(todo){
//         switch (e.target.value){
//             case 'all':
//                 todo.style.display = 'flex';
//                 break;

//             case 'completed':
//                 if (todo.classList.contains('completed')) {
//                     todo.style.display = 'flex';
//                 } else {
//                     todo.style.display = 'none';
//                 }
//                 break;

//             case 'uncompleted':
//                 if (!todo.classList.contains('completed')) {
//                     todo.style.display = 'flex';
//                 } else {
//                     todo.style.display = 'none';
//                 }
//                 break;
//         }
//     });
// }

function saveLocalTodos(todo) {
    //check if i have saveLocal in there?
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    console.log(todos);

    //todoのなかには追加ではいってきた文字がはいっている
    // console.log(todos);
}


function getTodos() 
{
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) 
    {

        //todoDiv
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // console.log(todoDiv);

        //Create LI -> Input accion
        const newTodo = document.createElement("input");    
        newTodo.value = todo;
        newTodo.disabled = true;
        newTodo.classList.add('todo-item');
        newTodo.type ='text';

        todoDiv.appendChild(newTodo);

        //Editar 
        const editarButton = document.createElement('button');
        editarButton.innerHTML = '<i class="fas fa-edit"></i>';
        editarButton.classList.add("editar-btn");

        todoDiv.appendChild(editarButton);

   
        //check mark bottun
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");

        todoDiv.appendChild(completeButton);


        //check trash bottun
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        //console.log(trashButton);

        todoDiv.appendChild(trashButton);

        // append to list
        todoList.appendChild(todoDiv);

        console.log(todo);
    })

    // console.log(todoList);
    

}

document.addEventListener('DOMContentLoaded', getTodos);


function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));

    }


    // const item = e.target;
    
    // // delete to do
    // if (item.classList[0] === "trash-btn") {

    //     const todo = item.parentElement;
    //     todo.classList.add("fall");
    //     removeLocalTodos(todo);

    //     //Animation
    //     todo.addEventListener('transitionend', function () {
    //         todo.remove();
    //     });        
    // }

    // //check mark
    // if (item.classList[0] === "complete-btn") {
    //     // console.log(item);
    //     const todo = item.parentElement;
    //     todo.classList.toggle("completed");    
    // }


    const todoIndex = todo.children[0].value;

    console.log(todoIndex);

    todos.splice(todos.indexOf(todoIndex), 1);

    console.log(todos);

    localStorage.setItem('todos', JSON.stringify(todos));


}