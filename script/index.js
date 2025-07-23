// add and delete category tab

const newCategoryTextInput = document.getElementById('add-new-category-tab');
const addNewCategoryTabBtn = document.querySelector('.add-new-category-tab-btn');
const createdCategoryTabsList = document.querySelector('.created-category-tabs-list');
const categoryTabsListContainer = document.querySelector('.category-tabs-list_container');
    console.log(categoryTabsListContainer);
    

addNewCategoryTabBtn.addEventListener('click', () => {
    const categoryName = newCategoryTextInput.value.trim();
    
    if (categoryName == '') {
        alert('Введіть назву вкладки категорії!');

        return;
    }

    const newCategoryLi = document.createElement('li');
    createdCategoryTabsList.appendChild(newCategoryLi);
    newCategoryLi.innerHTML = `
       <button class="created-category-tabs-button">${categoryName}</button>
       <button class="close-tab-button" aria-label="Закрити вкладку">×</button>
    ` 
    newCategoryLi.classList.add('category-tab');

    newCategoryTextInput.value = '';


    categoryTabsListContainer.style.display = 'flex';


    const createdCategoryTab = newCategoryLi.querySelector('.created-category-tabs-button');

    createdCategoryTab.addEventListener('click', () => {
        createdCategoryTab.classList.toggle('active');
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