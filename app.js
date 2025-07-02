const inpputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todolist");

let editTodo = null;

// Function to add/edit todo
const addTodo = () => {
  const inputText = inpputBox.value.trim();

  if (inputText.length <= 0) {
    alert("You must write something in your todo");
    return false;
  }

  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inpputBox.value = "";
    editTodo = null;
  } else {
    createTodoItem(inputText);
    inpputBox.value = "";
  }

  saveTodos();
};

// Function to create and render a todo item
const createTodoItem = (text) => {
  const li = document.createElement("li");

  const p = document.createElement("p");
  p.innerHTML = text;
  li.appendChild(p);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.classList.add("btn", "edit");
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Remove";
  deleteBtn.classList.add("btn", "delete");
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
};

// Function to update todo list (Edit/Delete)
const updateTodo = (e) => {
  if (e.target.innerText === "Remove") {
    todoList.removeChild(e.target.parentElement);
  } else if (e.target.innerText === "Edit") {
    inpputBox.value = e.target.previousElementSibling.innerHTML;
    inpputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
  saveTodos();
};

// Save all todos to localStorage
const saveTodos = () => {
  const todos = [];
  const items = document.querySelectorAll("#todolist p");
  items.forEach(item => todos.push(item.textContent));
  localStorage.setItem("Todos", JSON.stringify(todos));
};

// Load todos from localStorage on page load
const loadTodos = () => {
  const Tasks = JSON.parse(localStorage.getItem("Todos")) || [];
  Tasks.forEach(todo => createTodoItem(todo));
};

loadTodos();

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
