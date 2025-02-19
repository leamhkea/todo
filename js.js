//Her henter vi ul listen fra html
const toDoListQsl = document.querySelector(".to_do_list");
const doneListQsl = document.querySelector(".done_list");

//Lavet et tomt array
const toDoArr = [];

document
  .querySelector(".input_button")
  .addEventListener("click", addTaskToList);

function addTaskToList() {
  let inputValue = document.querySelector("#taskInput").value; //Henter værdien af input feltet

  const newObjToAddToArray = {
    id: self.crypto.randomUUID(),
    text: inputValue,
    done: false,
  };
  toDoArr.push(newObjToAddToArray);
  showToDo();
}

//Kalder på function for neden, for at vise indholdet
showToDo();

//Function som viser indholdet i arrayet toDoArr, som indeholder objekter
function showToDo() {
  //Fjerner den gamle liste før der oprettes den nye
  toDoListQsl.innerHTML = "";
  doneListQsl.innerHTML = "";
  toDoArr.forEach((task) => {
    const li = document.createElement("li");

    //Knappen skal være et input/check box i dom
    li.innerHTML += `<input type="checkbox" ${
      task.done ? "checked" : "" //Hvis task = done sættes attribute checked på (flueben) ellers fjernes checked
    } class="checkbox_done" ><p>${task.text}</p><span class="delete">🗑️</span>`;

    //Dette fungerer som if/else, så hvis task er done så "color_done" ellers :
    li.classList.add(task.done ? "color_done" : "color_to_do");

    //Sat click event på hvert enkelt element
    li.addEventListener("click", (evt) => {
      const currentTarget = evt.currentTarget;
      const target = evt.target;

      console.log("currentTarget", currentTarget);
      console.log("target", target);

      // Fjerner currenttarget (hele liste elementet) ved at klikke på target (som er krydset)
      if (target.classList.contains("delete")) {
        // Fjern opgaven fra toDoArr
        const taskId = task.id; // gem id'et fra den task, der skal fjernes
        const index = toDoArr.findIndex((item) => item.id === taskId); // find tasken i arrayet baseret på id
        if (index !== -1) {
          toDoArr.splice(index, 1); // fjern tasken fra arrayet
        }

        // Fjern elementet fra DOM
        currentTarget.remove();

        // Opdater listen
        showToDo();
      }

      //Begynder på event-deligation
      if (target.classList.contains("checkbox_done")) {
        console.log("JEG HAR KLIKKET PÅ Toggle done");

        //Fungerer som if/else da ! før task.done betyder at gøre det modsatte
        task.done = !task.done;

        console.log("toDoArr", toDoArr);

        //Kalder på function for at få vist farveskift ved click på button
        showToDo();
      }
    });
    if (task.done) {
      doneListQsl.appendChild(li);
    } else {
      toDoListQsl.appendChild(li);
    }
  });
}
