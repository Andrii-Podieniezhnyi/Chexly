const createdTabsBtns = document.querySelectorAll('.created-tabs-button');

console.log(createdTabsBtns);

createdTabsBtns.forEach(function (btn) {
    btn.addEventListener('click', () => {
        console.log('+');

        createdTabsBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
    })
})



// add and delete task item

const newTaskInput = document.getElementById('new-task-input');
const addNewTaskBtn = document.querySelector('.add-new-task-btn');
const taskList = document.querySelector('.task-list');



addNewTaskBtn.addEventListener('click', () => {
    newTaskText =  newTaskInput.value.trim();

    if (newTaskText == ''){
        alert('Введіть завдання!');

        return;
    }

    const taskId = 'task-' + Date.now();

    const newLi = document.createElement('li');
    newLi.className = 'task-item';


    newLi.innerHTML = `
        <input type="checkbox" id = "${taskId}" class="task-checkbox">
        <label for="${taskId}" class="task-label">"${newTaskText}"</label>
        <button class="task-delete">🗑️</button>
    `

    taskList.appendChild(newLi);

    newTaskInput.value = '';


    const delBtn = newLi.querySelector('.task-delete');

        delBtn.addEventListener('click', () => {
            newLi.remove();
        })

})