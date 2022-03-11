let todoTask = {
  title: "",
  description: "",
  isCompleted: false,
};

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
    let taskId = parseInt(clicked_id.split("-")[1]) - 1;
    if (taskList[taskId].isCompleted) {
        taskList[taskId].isCompleted = false;
    }
    else {
        taskList[taskId].isCompleted = true;
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

  document.getElementById("add-task-container").reset();

  taskList = [...taskList, task];
  localStorage.setItem("taskListLS", JSON.stringify(taskList));
};

const addTaskItemToTaskListHtml = (task, i) => {
  const taskListEl = document.getElementById("todo-list");
  const taskItemHtml =
  `<li class="todo-record ${isChecked[task.isCompleted]}">
        <button class="todo-checkbox" onclick="checkTheTask(this.id)" id="task-${i}"></button>
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