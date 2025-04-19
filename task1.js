// Завдання: отримання даних про користувачів 
// За допомогою засобі Fetch отримати інформацію про користувачів
// за посиланням - https://jsonplaceholder.typicode.com/users 
// Імена користувачів відобразити в ненумерованому списку ul.usersList,
// який створений у файлі index.html
// Запустити програму за допомогою Live Server
// Перевірити за допомогою команди npm tests/task1.test.js 

const list = document.querySelector('ul.usersList');

async function loadDataUsers() {
    console.log('Отримую дані з https://jsonplaceholder.typicode.com/users');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`Помилка запиту! Статус: ${response.statusText}`);
        }

        const users = await response.json();
        console.log('Дані отримано: ', users);

        list.innerHTML = '';

        users.forEach((user) => {
            const userListElement = document.createElement('li');
            userListElement.textContent = user.name;
            list.appendChild(userListElement);
        });

        console.log('Імена користувачів відображено.');
    } catch(error) {
        console.error('Не вдалося завантажити або обробити дані:', error);
        list.innerHTML = `<li style="color: red;">Помилка завантаження даних: ${error.message}</li>`;
    }
}

document.addEventListener('DOMContentLoaded',  () => {
    loadDataUsers();
})