// add and delete category tab

const newCategoryTextInput = document.getElementById('add-new-category-tab');
const addNewCategoryTabBtn = document.querySelector('.add-new-category-tab-btn');
const createdCategoryTabsList = document.querySelector('.created-category-tabs-list');


addNewCategoryTabBtn.addEventListener('click', () => {
    categoryName = newCategoryTextInput.value.trim();
    
    if (categoryName == '') {
        alert('Введіть назву вкладки категорії!');

        return;
    }

    const newCategoryLi = document.createElement('li');
    createdCategoryTabsList.appendChild(newCategoryLi);
    newCategoryLi.innerHTML = `
       <li><button class="created-category-tabs-button">${categoryName}</button></li>
    ` 

    newCategoryTextInput.value = '';


    const createdCategoryTab = newCategoryLi.querySelector('.created-category-tabs-button');

    createdCategoryTab.addEventListener('click', () => {
        createdCategoryTab.classList.toggle('active');
    })
    
})




 // style for active category tab
    
const createdCategoryTabsBtns = document.querySelectorAll('.created-category-tabs-button');

createdCategoryTabsBtns.forEach(function (btn) {
    btn.addEventListener('click', () => {
    
        createdCategoryTabsBtns.forEach(btn => btn.classList.remove('active'));
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
        <label for="${taskId}" class="task-label">${newTaskText}</label>
        <button class="task-delete">🗑️</button>
    `
    
    taskList.appendChild(newLi);
    taskList.classList.add('active-task-field');


    newTaskInput.value = '';



    const delBtn = newLi.querySelector('.task-delete');

        delBtn.addEventListener('click', () => {
            newLi.remove();

            
            if (taskList.firstChild === null) {
                taskList.classList.remove('active-task-field');
            }

        })

})