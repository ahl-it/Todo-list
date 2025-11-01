const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const statsfraction = document.getElementById('numbers');
const progressFill = document.getElementById('progress-fill'); 

// Add Task
function addTask(event) {
    event.preventDefault();
    let taskValue = inputBox.value.trim();

    if (taskValue === '') {
        alert('You must add your task');
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = taskValue;

    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.className = "delete-btn";

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
    updateStats();
}

// Press Enter to Add
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask(e);
    }
});


listContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains("task-checkbox")) {
        e.target.parentElement.classList.toggle("checked");
    }
    saveData();
    updateStats();
});

// Save Tasks
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    updateStats();
}
showTasks();
// update progress bar
function updateStats() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");

    const total = allTasks.length;
    const done = completedTasks.length;
    const pending = total - done;

    document.getElementById("task-stats").innerText =
        `Total: ${total} | Completed: ${done} | Pending: ${pending}`;

    statsfraction.innerText = `${done} / ${total}`;

    if (progressFill) {
        const percent = total ? (done / total) * 100 : 0;
        progressFill.style.width = percent + "%";

        if (percent < 40) {
            progressFill.style.backgroundColor = "#e74d3c91"; 
        } else if (percent < 80) {
            progressFill.style.backgroundColor = "#f1c40f83"; 
        } else {
            progressFill.style.backgroundColor = "#2ecc71"; 
        }
            }

}
