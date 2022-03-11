let todoTask = {
  title: "",
  description: "",
  isCompleted: false,
  taskId: null,
};

let minId = 100000;
let maxId = 999999;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let taskList = [];

const isChecked = {
  false: "todo-unchecked",
  true: "todo-checked",
};

const showAddContainer = () => {
  document.getElementById("add-task-container").style.visibility = "visible";
};

const hideAddContainer = () => {
  document.getElementById("add-task-container").style.visibility = "hidden";
};

const clearTaskList = () => {
    taskList = [];
    localStorage.removeItem("taskListLS");
    document.getElementById("todo-list").innerHTML= '';
} 

const checkTheTask = (clicked_id) => {
    let clickedTaskId = parseInt(clicked_id.split("-")[1]);
    let clickedTask = taskList.find(obj => {return obj.taskId === clickedTaskId}) ;
    
    if (clickedTask.isCompleted) {
      clickedTask.isCompleted = false;
    }
    else {
      clickedTask.isCompleted = true;
    }

    localStorage.setItem("taskListLS", JSON.stringify(taskList));
    document.getElementById("todo-list").innerHTML= '';
    listTasks();
}

const createTask = () => {
  let task = Object.create(todoTask);
  task.title = document.getElementById("new-task-title").value;
  task.description = document.getElementById("new-task-description").value;
  task.isCompleted = false;
  task.taskId = getRndInteger(minId, maxId);

  document.getElementById("add-task-container").reset();

  taskList = [...taskList, task];
  localStorage.setItem("taskListLS", JSON.stringify(taskList));
};

const addTaskItemToTaskListHtml = (task, i) => {
  const taskListEl = document.getElementById("todo-list");
  const taskItemHtml =
  `<li class="todo-record ${isChecked[task.isCompleted]}">
        <button class="todo-checkbox" onclick="checkTheTask(this.id)" id="task-${task.taskId}"></button>
        <div class="todo-record-text">
            <h2>${task.title}</h2>
            <h3>${task.description}</h3>
        </div>
    </li>`;
  taskListEl.insertAdjacentHTML("beforeend", taskItemHtml);
};

const listTasks = () => {
  let taskListLS = localStorage.getItem("taskListLS");

  if (taskListLS) {
    taskList = JSON.parse(taskListLS);
    for (let i = 0; i < taskList.length; i++ ) {
        addTaskItemToTaskListHtml(taskList[i] , i + 1)
    };
  }
};

listTasks();