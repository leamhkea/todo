// Tilføjning af task (addTask-funktionen)
function addTask() {
  const taskText = taskInput.value.trim(); // Henter værdien fra input-feltet

  if (taskText !== "") {
    // Opret en ny task og tilføj den til toDoArr
    const newTask = {
      id: self.crypto.randomUUID(),
      text: taskText,
      done: false,
    };

    toDoArr.push(newTask); // Tilføj task til arrayet
    taskInput.value = ""; // Ryd inputfeltet

    // Vis de opdaterede opgaver
    showToDo();
  }
}

// Ændringer i showToDo funktionen:
function showToDo() {
  // Fjerner den gamle liste før der oprettes den nye
  toDoListQsl.innerHTML = "";
  doneListQsl.innerHTML = "";

  // Gå igennem alle tasks og tilføj dem til listen
  toDoArr.forEach((task) => {
    const li = document.createElement("li");

    // Skab HTML-struktur for hvert task
    li.innerHTML += `<input type="checkbox" ${
      task.done ? "checked" : ""
    } class="mark_toggle_done"> ${task.text} <span class="delete">x</span>`;

    // Tilføj class til li baseret på om task er færdig eller ej
    li.classList.add(task.done ? "color_done" : "color_to_do");

    // Tilføj click event listener til hvert element
    li.addEventListener("click", (evt) => {
      const currentTarget = evt.currentTarget;
      const target = evt.target;

      // Hvis delete-knappen trykkes på, fjern task
      if (target.classList.contains("delete")) {
        const taskIndex = toDoArr.findIndex((t) => t.id === task.id);
        toDoArr.splice(taskIndex, 1); // Fjern task fra array
        showToDo(); // Opdater listen efter fjernelse
      }

      // Hvis mark_toggle_done checkboxen er klikket på, opdater task
      if (target.classList.contains("mark_toggle_done")) {
        task.done = !task.done; // Toggle done status
        showToDo(); // Opdater listen efter ændring
      }
    });

    // Hvis task er done, tilføj den til done-listen, ellers til toDo-listen
    if (task.done) {
      doneListQsl.appendChild(li);
    } else {
      toDoListQsl.appendChild(li);
    }
  });
}

// Find knappen og tilføj event listener
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", addTask); // Knyt knappen til addTask
