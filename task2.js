// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js

const inputElement = document.getElementById('userNameInput');
const buttonElement = document.getElementById('getUserButton');
const spanElement = document.getElementById('userCity');

async function getUsersCity(userName) {
    console.log('Відправляю запит на https://jsonplaceholder.typicode.com/users');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Помилка запиту! Статус: ${response.statusText}`);
        }
        const users = await response.json();
        console.log('Дані отримано: ', users);

        const foundUser = users.find((user) => user.name === userName);

        if (foundUser) {
            console.log('Користувача знайдено');
            return foundUser.address.city;
        }
    } catch (error) {
        console.error('Не вдалося знайти користувача: ',  error.message);
    }
}

buttonElement.addEventListener('click', async (event) => {
    const inputName = inputElement.value.trim();
    const city = await getUsersCity(inputName);
    if (city) {
        spanElement.innerText = city;
    } else {
        spanElement.innerText = 'Не вдалося знайти користувача';
    }
})