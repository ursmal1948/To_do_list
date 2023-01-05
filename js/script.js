{
    const tasks = [
       
    ];

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

     
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
 
        
    render();
    };

    const clearAndFocusInput =  () => {
        const newTask = document.querySelector(".js-newTask")
        newTask.value = ""
        newTask.focus();
    };


    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
                    render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
                removeButton.addEventListener("click", () => {
                    removeTask(index);
                });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
                toggleDoneButton.addEventListener("click", () => {
                    toggleTaskDone(index);
                });
        });
    }
    const render = () => {
        let htmlString = "";
    
        for (const task of tasks) {
            htmlString += `
            <li class="list__item"
            >
            <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
            <span class="list__itemContent ${task.done ? "list__itemContent--done" : ""}" >${task.content}</span> 
            <button class="js-remove list__button list__button--remove">🗑</button>
            </li>
            `;
        }
    
        document.querySelector(".js-tasks").innerHTML = htmlString;


        bindEvents();
    };

    

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if(newTaskContent === "") {
            return;
        } 
            addNewTask(newTaskContent);

            clearAndFocusInput();
        
    };

   

   
    const init =  () => {
        render();

        const form = document.querySelector(".js-form")

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}