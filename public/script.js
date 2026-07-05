// Run the code after the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Get the input elements
  const taskList = document.querySelector(".task-list");
  const btnEl = document.querySelector(".btn");
  const inputEl = document.querySelector(".userInput");

  // Load all notes
  getNotes();

  // Add a note when the button is clicked
  btnEl.addEventListener("click", addNote);

  // Add a note when Enter is pressed
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addNote();
    }
  });

  // Get all notes from the server
  async function getNotes() {
    const response = await fetch("/data");
    const notes = await response.json();

    // Clear the list
    taskList.innerHTML = "";

    // Show each note
    notes.forEach((note) => {
      createNote(note);
    });
  }

  // Add a new note
  async function addNote() {
    // Get the note from the input
    const task = inputEl.value.trim();

    // Check if the input is empty
    if (task === "") {
      alert("Please enter a note");
      return;
    }

    // Send the note to the server
    const response = await fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: task }),
    });

    // Get the saved note
    const result = await response.json();

    // Show the new note
    createNote(result.data);

    // Clear the input
    inputEl.value = "";
  }

  // Create and display a note
  function createNote(note) {
    // Save the current note
    let currentTask = note.text;

    // Create the HTML elements
    const liEl = document.createElement("li");
    const taskText = document.createElement("span");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    // Prevent the buttons from submitting the form
    editBtn.type = "button";
    deleteBtn.type = "button";

    // Show the note text
    taskText.textContent = currentTask;

    // Add Bootstrap classes
    liEl.classList.add(
      "task-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mb-2",
      "border",
      "p-2",
      "rounded"
    );

    // Create the Edit button
    const editText = document.createElement("span");
    editText.textContent = "Edit";
    editText.className = "edit-text";

    const editIcon = document.createElement("i");
    editIcon.className = "bi bi-pencil-square edit-icon";

    editBtn.classList.add("btn", "btn-warning", "btn-sm");
    editBtn.append(editText, editIcon);

    // Create the Delete button
    const deleteText = document.createElement("span");
    deleteText.textContent = "Delete";
    deleteText.className = "delete-text";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash delete-icon";

    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.append(deleteText, deleteIcon);

    // Create a button container
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("d-flex", "align-items-center", "gap-2");

    // Add the buttons
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    // Check if the note is being edited
    let isEditing = false;

    // Edit or save the note
    editBtn.addEventListener("click", async function () {
      // Switch to edit mode
      if (!isEditing) {
        taskText.contentEditable = true;
        taskText.focus();

        editBtn.textContent = "Save";
        isEditing = true;
      } else {
        // Get the updated note
        const newTask = taskText.textContent.trim();

        // Check if the note is empty
        if (newTask === "") {
          alert("Note cannot be empty");
          taskText.textContent = currentTask;
          return;
        }

        // Send the updated note to the server
        const response = await fetch(`/data/${note.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newTask }),
        });

        // Get the updated note
        const result = await response.json();

        // Update the note
        currentTask = result.data.text;
        taskText.textContent = currentTask;
        taskText.contentEditable = false;

        // Stop editing
        editBtn.textContent = "";
        editBtn.append(editText, editIcon);

        isEditing = false;
      }
    });

    // Delete a note
    deleteBtn.addEventListener("click", async function () {
      // Send the delete request
      await fetch(`/data/${note.id}`, {
        method: "DELETE",
      });

      // Remove the note
      liEl.remove();
    });

    // Add the note and buttons
    liEl.appendChild(taskText);
    liEl.appendChild(buttonGroup);

    // Show the note
    taskList.appendChild(liEl);
  }
});