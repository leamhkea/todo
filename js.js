//Henter ul listen fra html. Hentning af DOM-elementer:
const toDoListQsl = document.querySelector(".to_do_list");
const doneListQsl = document.querySelector(".done_list");

//Opretter et tomt array (holder styr på alle opgaverne som objekter med ID, tekst og færdigstatus)
const toDoArr = [];

// Når knappen med klassen .input_button bliver klikket, kaldes funktionen addTaskToList().
document
  .querySelector(".input_button")
  .addEventListener("click", addTaskToList);

// Funktionen til at tilføje opgaver, og en ny opgave (objekt) bliver oprettet
function addTaskToList() {
  let inputValue = document.querySelector("#taskInput").value; //Henter værdien af input feltet

  const newObjToAddToArray = {
    id: self.crypto.randomUUID(),
    text: inputValue,
    done: false,
  };
  // Opgaven tilføjes til arrayet toDoArr, og funktionen showToDo() kaldes for at opdatere visningen.
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
    } class="checkbox_done" ><p>${
      task.text
    }</p><input class="antal" type="number" value="${
      task.quantity
    }" ><span class="delete">❌</span>`;

    //Dette fungerer som if/else, så hvis task er done så "color_done" ellers :
    li.classList.add(task.done ? "color_done" : "color_to_do");

    //Sat click event på hvert enkelt element
    li.addEventListener("click", (evt) => {
      const currentTarget = evt.currentTarget;
      const target = evt.target;

      console.log("currentTarget", currentTarget);
      console.log("target", target);

      // Find input-feltet for antal stk i input
      const quantityInput = li.querySelector(".antal");
      quantityInput.addEventListener("input", (event) => {
        task.quantity = event.target.value;
      });

      // Fjerner currenttarget (hele liste elementet) ved at klikke på target (som er krydset).
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
