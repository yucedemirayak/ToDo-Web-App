let ToDoTask = {
  title: "",
  description: "",
  isCompleted: false,
  taskId: 0,
};

let minId = 100000;
let maxId = 999999;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let taskList = [];

const isChecked = {
  false: "todo-unchecked",
  true: "todo-checked",
};

const toggleAddContainer = () => {
  document.getElementById("add-background").classList.toggle("add-background");
  document.getElementById("todo-header").classList.toggle("index-back");
  document.getElementById("todo-list-section").classList.toggle("index-back");
  document.getElementById("add-task-container").classList.toggle("show");
};


const clearTaskList = () => {
  taskList = [];
  localStorage.removeItem("taskListLS");
  document.getElementById("todo-list").innerHTML = "";
  todoNothing();
};

const checkTheTask = (clicked_id) => {
  document.getElementById(clicked_id).parentElement.classList.toggle("todo-checked")

  let clickedTaskId = parseInt(clicked_id.split("-")[1]);
  let clickedTask = taskList.find((obj) => {
    return obj.taskId === clickedTaskId;
  });

  if (clickedTask.isCompleted) {
    clickedTask.isCompleted = false;
  } else {
    clickedTask.isCompleted = true;
  }

  localStorage.setItem("taskListLS", JSON.stringify(taskList));
};

function arrayRemove(arr, value) {
  return arr.find(function (ele) {
    return ele != value;
  });
}

const deleteTheTask = (clicked_id) => {
  let clickedTaskId = parseInt(clicked_id.split("-")[1]);
  taskList.splice(
    taskList.findIndex((obj) => obj.taskId === clickedTaskId),
    1
  );
  document.getElementById(clicked_id).parentElement.remove();
  localStorage.setItem("taskListLS", JSON.stringify(taskList));
  if (taskList.length == 0) todoNothing(), localStorage.removeItem("taskListLS");
};

const createTask = () => {
  let newTaskTitle = document.getElementById("new-task-title").value;
  let newTaskDescription = document.getElementById("new-task-description").value;
  
  if (newTaskTitle || newTaskDescription) {
    let task = {
      ...ToDoTask,
      taskId: getRndInteger(minId, maxId),
      title: newTaskTitle,
      description: newTaskDescription,
    }
    taskList = [...taskList, task];
    localStorage.setItem("taskListLS", JSON.stringify(taskList));
  };
}

const addTaskItemToTaskListHtml = (task) => {
  const taskListEl = document.getElementById("todo-list");
  const taskItemHtml = `<li class="todo-record row ${isChecked[task.isCompleted]}">
                          <button class="todo-checkbox col-1 offset-1 col-md-1 offset-md-1" onclick="checkTheTask(this.id)" id="task-${task.taskId}"></button>
                          <div class="todo-record-text col-8 col-md-8">
                            <h2>
                              ${task.title}
                              <div class="text-line-through"></div>
                            </h2>
                            <h3>${task.description}</h3>
                          </div>
                          <button class="todo-delete col-2 col-md-2" onclick="deleteTheTask(this.id)" id="task-${task.taskId}">
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </li>`;
  taskListEl.insertAdjacentHTML("beforeend", taskItemHtml);
};

const listTasks = () => {
  let taskListLS = localStorage.getItem("taskListLS");
  if (taskListLS) {
    taskList = JSON.parse(taskListLS);
    for (let i = 0; i < taskList.length; i++) {
      addTaskItemToTaskListHtml(taskList[i]);
    }
  }
};

const todoNothing = () => {
  const noneToDo = `<li class="todo-list-none">
                      <span>Nothing to list here...</span>
                      <span>to create a To-Do click "+" icon.</span>
                    </li>`;
  document.getElementById("todo-list").insertAdjacentHTML("beforeend",noneToDo);
}

window.addEventListener('load', (event) => {
  taskListLS = JSON.parse(localStorage.getItem("taskListLS"));
  if (taskListLS) {
    taskList = taskListLS;
      listTasks();
  }
  else {
    todoNothing();
  }
});