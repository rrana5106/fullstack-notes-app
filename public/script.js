// select page elements
const taskList = document.querySelector(".task-list");
const btnEl = document.querySelector(".btn");
const inputEl = document.querySelector(".userInput");

// array to store tasks
const tasks = [];

// add task when button is clicked
btnEl.addEventListener("click", addTask);

// allow users to add a task by pressing Enter
inputEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

// function to add a new task
function addTask() {
  // getting the value from the input field
  const task = inputEl.value.trim();

  // checking if the input is empty
  if (task === "") {
    alert("Please enter a task");
    return;
  }

  // checking if the task already exists
  if (tasks.includes(task)) {
    alert("Task already exists");
    return;
  }

  // adding the task to the array
  tasks.push(task);

  // show the task on the page
  createTask(task);

  // clearing the input field
  inputEl.value = "";
}

// function to create and display a task
function createTask(task) {
  // keeping track of the current task name
  let currentTask = task;

  // creating new elements
  const liEl = document.createElement("li");
  const taskText = document.createElement("span");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  // prevent buttons from submitting the form
  editBtn.type = "button";
  deleteBtn.type = "button";

  // displaying task text
  taskText.textContent = currentTask;

  // styling the task item
  liEl.classList.add(
    "task-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mb-2",
    "border",
    "p-2",
    "rounded",
  );

  // creating edit button text
  const editText = document.createElement("span");
  editText.textContent = "Edit";
  editText.className = "edit-text";

  // creating edit icon
  const editIcon = document.createElement("i");
  editIcon.className = "bi bi-pencil-square edit-icon";

  // styling edit button
  editBtn.classList.add("btn", "btn-warning", "btn-sm");

  // adding text and icon to edit button
  editBtn.append(editText, editIcon);

  // creating delete button text
  const deleteText = document.createElement("span");
  deleteText.textContent = "Delete";
  deleteText.className = "delete-text";

  // creating delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "bi bi-trash delete-icon";

  // styling delete button
  deleteBtn.classList.add("btn", "btn-danger", "btn-sm");

  // adding text and icon to delete button
  deleteBtn.append(deleteText, deleteIcon);

  // creating a container for the action buttons
  const buttonGroup = document.createElement("div");

  // keeping edit and delete buttons next to each other
  buttonGroup.classList.add("d-flex", "align-items-center", "gap-2");

  // adding buttons to the container
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);

  // check if this task is currently being edited
  let isEditing = false;

  // handle editing and saving a task
  editBtn.addEventListener("click", function () {
    // switch to edit mode when the edit button is clicked
    if (!isEditing) {
      // make the task text editable
      taskText.contentEditable = true;

      // place the cursor inside the task text
      taskText.focus();

      // change button text to save
      editBtn.textContent = "Save";

      // update editing status
      isEditing = true;
    } else {
      // get the updated task text and remove extra spaces
      const newTask = taskText.textContent.trim();

      // check if the edited task is empty
      if (newTask === "") {
        alert("Task cannot be empty");

        // restore the original task text
        taskText.textContent = currentTask;
        return;
      }

      // check if another task with the same name already exists
      if (tasks.includes(newTask) && newTask !== currentTask) {
        alert("Task already exists");

        // restore the original task text
        taskText.textContent = currentTask;
        return;
      }

      // find the task in the array
      const taskIndex = tasks.indexOf(currentTask);

      // update the task in the array
      tasks[taskIndex] = newTask;

      // save the updated task name
      currentTask = newTask;

      // disable editing mode
      taskText.contentEditable = false;

      // restore the edit button icon
      editBtn.textContent = "";
      editBtn.append(editText, editIcon);

      // update editing status
      isEditing = false;
    }
  });

  // deleting a task
  deleteBtn.addEventListener("click", function () {
    // remove task from page
    liEl.remove();

    // find task position in array
    const taskIndex = tasks.indexOf(currentTask);

    // remove task from array
    tasks.splice(taskIndex, 1);
  });

  // adding task text to the list item
  liEl.appendChild(taskText);

  // adding the button container
  liEl.appendChild(buttonGroup);

  // displaying the task on the page
  taskList.appendChild(liEl);
}
