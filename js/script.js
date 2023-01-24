{
    let tasks = [];
    let hideDoneTasks = false;

    const hideShowTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map((task) => (

            { ...task, done: true }
        ))
        render();
    }

    const addNewTask = (newTaskContent) => {

        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const clearAndFocusInput = () => {
        const newTask = document.querySelector(".js-newTask")

        newTask.value = "";
        newTask.focus();
    };


    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done && hideDoneTasks === true ? "list__item--hidden" : ""}"
            >
            <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
            <span class="list__itemContent ${task.done ? "list__itemContent--done" : ""}" >${task.content}</span> 
            <button class="js-remove list__button list__button--remove">🗑</button>
            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const bindButtonsEvents = () => {
        const completeAllButton = document.querySelector(".js-completeAll");

        if (completeAllButton) {
            completeAllButton.addEventListener("click", completeAllTasks)
        }

        const hideShowButton = document.querySelector(".js-hideShow");

        if (hideShowButton) {
            hideShowButton.addEventListener("click", hideShowTasks)
        };

    };


    const renderButtons = () => {
        let htmlButtonsString = "";

        if (tasks.length === 0) {
            return document.querySelector(".js-buttons").innerHTML = "";
        } else {
            htmlButtonsString += `
                <button class="js-hideShow hideShowButton">Ukryj ukończone</button>
                <button class="js-completeAll completeAllButton"${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
                `
        }

        document.querySelector(".js-buttons").innerHTML = htmlButtonsString;

    };



    const render = () => {

        renderTasks();

        bindEvents();
        renderButtons();
        bindButtonsEvents();
    };



    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);

        clearAndFocusInput();

    };




    const init = () => {
        render();

        const form = document.querySelector(".js-form")

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}