const enumStatus = {
    COMPLETED: "COMPLETED",
    IN_PROGRESS: "IN PROGRESS"
};

let taskList = [];

/* Change the status of a single task */
const changeStatus = (index) => {
    const currentTask = taskList.find((task, i) => index === i);
    currentTask.status = currentTask.status === enumStatus.COMPLETED ? enumStatus.IN_PROGRESS : enumStatus.COMPLETED;
    renderTaskList();
};

/* Update html to show the current tasks in the list */
const renderTaskList = () => {
    const ul = document.getElementById('task-list');
    ul.innerHTML = '';

    taskList.forEach((task, i) => {
        const li = document.createElement('li');
        li.className = task.status === enumStatus.COMPLETED ? 'completed' : 'in-progress';

        const statusContainerClass = task.status === enumStatus.COMPLETED ? 'status-container completed' : 'status-container in-progress';
        const taskItemClass = task.status === enumStatus.COMPLETED ? 'task-item completed' : 'task-item in-progress';

        const liContent = `
        <span class="${taskItemClass}">${task.desc}</span>
        <div class="${statusContainerClass}">
            <span>status:</span>
            <span class="status" onclick="changeStatus(${i})">${task.status}</span>
        </div>
        `;
        li.innerHTML = liContent;
        ul.appendChild(li);
    });
};

/* Adds a task to the current task list with default status IN PROGRESS */
const addTask = () => {
    const input = document.getElementById('input-task');
    if (input?.value) {
        taskList.push({ desc: input.value, status: enumStatus.IN_PROGRESS });
        renderTaskList();
    }
    input.value = '';
};

/* Remove tasks that are in status COMPLETED */
const removeCompletedTasks = () => {
    taskList = taskList.filter(task => task.status != enumStatus.COMPLETED);
    renderTaskList();
};
