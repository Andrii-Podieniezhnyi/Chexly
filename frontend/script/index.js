const newCategoryTextInput = document.getElementById('add-new-category-tab');
const addNewCategoryTabBtn = document.querySelector('.add-new-category-tab-btn');
const createdCategoryTabsList = document.querySelector('.created-category-tabs-list');
const categoryTabsListContainer = document.querySelector('.category-tabs-list_container');




// Функція рендеру вкладки в DOM
function renderTab(tab) {
    const newCategoryLi = document.createElement('li');
    newCategoryLi.classList.add('category-tab');
    newCategoryLi.dataset.id = tab._id; // id з MongoDB

    newCategoryLi.innerHTML = `
        <button class="created-category-tabs-button">${tab.name}</button>
        <button class="close-tab-button" aria-label="Закрити вкладку">×</button>
    `;

    createdCategoryTabsList.appendChild(newCategoryLi);
    categoryTabsListContainer.style.display = 'flex';

    // Клік по вкладці
    const createdCategoryTab = newCategoryLi.querySelector('.created-category-tabs-button');
    createdCategoryTab.addEventListener('click', () => {
        createdCategoryTab.classList.toggle('active');
    });

    // Видалення вкладки (DOM, бекенд зробимо пізніше)
    const closeBtn = newCategoryLi.querySelector('.close-tab-button');
    closeBtn.addEventListener('click', async() => {
        
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`http://localhost:5000/api/tabs/${tab._id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const data = await res.json();

            if(!res.ok){
                alert(data.message || 'Помилка видалення вкладки');
                return;
            }

            newCategoryLi.remove();

            if (!createdCategoryTabsList.firstChild) {
                categoryTabsListContainer.style.display = 'none';
            }

        } catch (error) {
            console.error('Помилка при видаленні вкладки:', error);
            alert('Щось пішло не так!');
        }
    });
}


// заванетаження модального вікна авторизваці/реєстрації

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    console.log('На даний час в системі:', username);
    console.log('Токен входу:', token);

    if (!token) {
        document.querySelector('.auth-modal').classList.add('show');
    } else {
        loadTabs();
    }
});


// change modal window  auth || reg

document.addEventListener('click', (event) => {
    if (event.target.id === 'show-register') {
        document.querySelector('.auth-modal').classList.remove('show');
        document.getElementById('register-modal').classList.add('show');
    }

    if (event.target.id === 'show-login') {
        document.getElementById('register-modal').classList.remove('show');
        document.querySelector('.auth-modal').classList.add('show');
    }
});


// modal window reg

document.getElementById('register-button').addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Реєстрація успішна!');
            document.getElementById('register-modal').classList.remove('show');
        } else {
            alert(data.message || 'Помилка реєстрації');
        }
    } catch (error) {
        alert('Щось пішло не так!');
        console.error(error);
    }
});


// modal window  auth

document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log('Відповідь з сервера:', data);

        if (res.ok) {
            alert('Вхід успішний!');
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);
            document.querySelector('.auth-modal').classList.remove('show');

            // після входу одразу підтягуємо вкладки
            loadTabs();
        } else {
            alert(data.message || 'Помилка входу');
        }
    } catch (error) {
        alert('Щось піщло не так!');
        console.error(error);
    }
});

// logout btn

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    document.querySelector('.auth-modal').classList.add('show');
    alert('Ви вийшли з акаунту');
});


// add and delete category tab

window.addEventListener('DOMContentLoaded', () => {
    addNewCategoryTabBtn.addEventListener('click', async() => {
        const categoryName = newCategoryTextInput.value.trim();

        if (categoryName === '') {
            alert('Введіть назву вкладки категорії!');
            return;
        }

        const token  =  localStorage.getItem('token');
        try {
            
            const res = await fetch('http://localhost:5000/api/tabs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ name: categoryName})
            })

            const data = await res.json();

            if(!res.ok){
                alert(data.message || 'Помилка додавання вкладки');
                return;
            }

            renderTab(data.tab);

            newCategoryTextInput.value = '';
            categoryTabsListContainer.style.display = 'flex';

        } catch (error) {
            console.error('Помилка при додаванні вкладки:', error);
            alert('Щось пішло не так!');    
        }
    });
});



// Завантаження вкладок з сервера
async function loadTabs() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch('http://localhost:5000/api/tabs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await res.json();
        console.log('Вкладки з сервера:', data);
        

        if (!res.ok) {
            console.error('Помилка при завантаженні вкладок:', data.message);
            return;
        }

        // Очищаємо список перед відмальовкою
        createdCategoryTabsList.innerHTML = '';

        // Малюємо вкладки
       data.tabs.forEach(tab => renderTab(tab));
    } catch (error) {
        console.error('Помилка при завантаженні вкладок:', error);
    }
}



// add and delete task item

const newTaskInput = document.getElementById('new-task-input');
const addNewTaskBtn = document.querySelector('.add-new-task-btn');
const taskList = document.querySelector('.task-list');

addNewTaskBtn.addEventListener('click', () => {
    newTaskText = newTaskInput.value.trim();

    if (newTaskText == '') {
        alert('Введіть завдання!');
        return;
    }

    const taskId = 'task-' + Date.now();

    const newLi = document.createElement('li');
    newLi.className = 'task-item';

    newLi.innerHTML = `
        <input type="checkbox" id="${taskId}" class="task-checkbox">
        <label for="${taskId}" class="task-label">${newTaskText}</label>
        <button class="task-delete">🗑️</button>
    `;

    taskList.appendChild(newLi);
    taskList.classList.add('active-task-field');

    newTaskInput.value = '';

    const delBtn = newLi.querySelector('.task-delete');
    delBtn.addEventListener('click', () => {
        newLi.remove();

        if (taskList.firstChild === null) {
            taskList.classList.remove('active-task-field');
        }
    });
});