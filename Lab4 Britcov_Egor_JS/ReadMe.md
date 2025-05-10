# Лабораторная работа №4. Учёт личных финансов на JavaScript

## Цель:

Научиться:
- работать с DOM и формами;
- обрабатывать события и управлять состоянием;
- структурировать проект с помощью модулей;
- создавать простое SPA-приложение без фреймворков.

## Условие

Создать веб-приложение "Учёт личных финансов" с возможностью:
- добавления транзакций с категорией, описанием и суммой;
- отображения транзакций в таблице;
- удаления транзакций;
- подсчёта общей суммы;
- отображения полного описания при клике на строку.

---
## 1. Структура Проекта:

- #### Ниже представлена структура проекта с комментариями, поясняющие каждый файл.
```
/твой-проект
│
├── index.html       # Главный HTML-файл
├── style.css        # Файл стилей
└── /src             # Папка с JavaScript-модулями
    ├── index.js     # Главный файл, импортирующий другие модули
    ├── transactions.js # Модуль для работы с массивом транзакций
    ├── ui.js        # Модуль для работы с DOM
    └── utils.js     # Вспомогательные функции
```
## 2. HTML-разметка:

Форма для ввода транзакции и таблица:
```html
<form id="transaction-form">
  <input type="number" id="amount" placeholder="Сумма" required />
  <select id="category" required>
    <option value="">Выберите категорию</option>
    <option value="Продукты">Продукты</option>
    <option value="Транспорт">Транспорт</option>
    <option value="Зарплата">Зарплата</option>
    <option value="Развлечения">Развлечения</option>
    <option value="Прочее">Прочее</option>
  </select>
  <input type="text" id="description" placeholder="Описание" required />
  <button type="submit">Добавить транзакцию</button>
  <p id="form-error" style="color: red; display: none;"></p>
</form>

<table id="transactions-table">
  <thead>
    <tr>
      <th>Дата и Время</th>
      <th>Категория</th>
      <th>Описание</th>
      <th>Действие</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<p id="full-description" style="margin-top: 20px; font-style: italic; color: #555;">
  Нажмите на транзакцию, чтобы увидеть полное описание.
</p>
```
- #### Ничего необычного, просто форма и таблица на языке разметки HTML.
> Пункт `Category` выполнен как селектор категории транзакций.

---

## 3. Стилизация страницы с помощью CSS:
- #### Страница стилизовна минимально с помощью CSS чтобы иметь хоть какой-то вид для комфортной на ней работе.
```css
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #e7e6b7;
}

th, td {
  border: 3px solid #dcacac;
  padding: 8px;
  text-align: left;
  font-family:cursive;
  color:#a14949;
}
```
- #### Выше представлена стилизация таблицы, заголовка таблицы и её ячеек.
---
- #### Ниже представлена реализация стилизации заднего фона всего документа, кнопки добавления транзакции и счетчика балланса.
```css
button {
  padding: 4px 8px;
  background-color: #658770;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

button:hover {
  background-color: #c02bc0;
  transition: 1s;
}

#total-container {
  display: inline-block;
  background-color: #f7fafd;
  border: 2px solid #3498db;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 1.4em;
  font-weight: bold;
  color: #2c3e50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}
body {
    background-color: #dadba4;
}
```
---
## Основной функционал
 ### 1. Добавление транзакций
 
#### Пользователь может добавить новую транзакцию через форму. После отправки формы вызывается функция `addTransaction()`, которая:

#### Создаёт объект транзакции. Добавляет его в массив transactions. Создаёт новую строку в таблице. Пример создания объекта транзакции:
```js
const newTransaction = {
    id: generateId(),
    date: new Date().toISOString(),
    amount,
    category,
    description
};
```
---
### 2. Удаление транзакций
#### Каждая строка таблицы содержит кнопку "Удалить". При нажатии на кнопку:

#### Транзакция удаляется из массива transactions. Соответствующая строка удаляется из таблицы. Пример удаления транзакции:
```js
if (e.target.classList.contains('delete-button')) {
    const idToDelete = e.target.dataset.id;
    const index = transactions.findIndex((t) => t.id === idToDelete);
    if (index !== -1) {
        transactions.splice(index, 1);
    }
    e.target.closest('tr').remove();
}
```
---
### 3. Подсчёт общей суммы
Функция `calculateTotal()` пересчитывает общую сумму всех транзакций и отображает её на странице:
```js
const total = transactions.reduce((sum, t) => sum + t.amount, 0);
document.getElementById('total').textContent = total.toFixed(2);
```
---
### 4. Отображение полного описания
#### При клике на строку таблицы отображается полное описание транзакции:
```js
if (e.target.tagName === 'TD') {
    const row = e.target.closest('tr');
    const fullDesc = row?.dataset.description;
    if (fullDesc) {
        document.getElementById('full-description').textContent = `Полное описание: ${fullDesc}`;
    }
}
```
## Ключевые фрагменты кода
### Генерация уникального ID

- #### Функция `generateId()` создаёт уникальный идентификатор для каждой транзакции:
```js
export function generateId() {
    return Math.random().toString(36).substring(2, 9);
}
```
## Добавление строки в таблицу
- #### Функция `addTransaction()` добавляет новую строку в таблицу и подсвечивает её в зависимости от суммы:
```js
const row = document.createElement('tr');
row.style.color = transaction.amount > 0 ? 'green' : 'red';
row.dataset.description = transaction.description;

const shortDescription = transaction.description.split(' ').slice(0, 4).join(' ');
row.innerHTML = `
    <td>${new Date(transaction.date).toLocaleString()}</td>
    <td>${transaction.category}</td>
    <td>${shortDescription}</td>
    <td><button class="delete-button" data-id="${transaction.id}">Удалить</button></td>
`;
tableBody.appendChild(row);
```
---
# Заключение
### Проект успешно реализует все поставленные задачи:

- Добавление, удаление и управление транзакциями.
- Подсчёт общей суммы.
- Отображение подробного описания транзакций.
- Корректная документация кода с использованием JSDoc.
---
# Контрольные Вопросы:
### 1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
Для доступа к элементам DOM в JavaScript используются следующие методы:
`document.getElementById(id)`— выбирает элемент по его уникальному id
```js
const element = document.getElementById('thatItem');
```
---
`document.querySelector(selector)` — выбирает первый элемент, соответствующий CSS-селектору.
```js
const element = document.querySelector('.Binance'); // По классу
const element = document.querySelector('#t01');    // По ID
const element = document.querySelector('div');      // По тегу
```
---
`document.getElementsByClassName(className)` — выбирает все элементы с указанным классом (возвращает HTMLCollection).
```js
const elements = document.getElementsByClassName('myClass');
```
---
`document.getElementsByTagName(tagName)` — выбирает все элементы с указанным тегом.
```js
const elements = document.getElementsByTagName('div');
```
---
# 2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
  Делегирование событий — это паттерн, при котором обработчик события добавляется не на каждый отдельный элемент, а на их общего родителя. Это позволяет эффективно управлять событиями, особенно если элементы добавляются динамически.

### Преимущества:

Уменьшает количество обработчиков событий.
Работает с динамически созданными элементами.

Пример:
```js
// Добавляем обработчик события на таблицу
document.getElementById('transactions-table').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        // Обработка клика на кнопку удаления
        const idToDelete = e.target.dataset.id;
        console.log(`Удалить транзакцию с ID: ${idToDelete}`);
    }
});
```
---
# 3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
### После выборки элемента его содержимое можно изменить с помощью следующих свойств:

`element.textContent` — изменяет текстовое содержимое элемента.
```js
const element = document.getElementById('myElement');
element.textContent = 'Новый текст';
```
---
`element.innerHTML` — изменяет HTML-содержимое элемента.
javascript
```js
const element = document.getElementById('myElement');
element.innerHTML = '<strong>Новый текст</strong>';
```
---
`element.style.property` — изменяет стили элемента.
```js
const element = document.getElementById('myElement');
element.style.color = 'red'; // Изменение цвета текста
```
---
# 4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript?
> ### Чтобы добавить новый элемент в DOM, нужно выполнить следующие шаги:

Создать элемент с помощью document.createElement().
Наполнить элемент содержимым (текст, атрибуты, стили и т.д.).
Добавить элемент в DOM с помощью методов вставки.

Пример:
```js
// Создание нового элемента
const newElement = document.createElement('div');
newElement.textContent = 'Новый элемент';
newElement.style.color = 'blue';

// Добавление элемента в DOM
const container = document.getElementById('container');
container.appendChild(newElement);
```
---
### Методы вставки:

- appendChild() — добавляет элемент в конец родительского элемента.
- insertBefore() — добавляет элемент перед указанным дочерним элементом.
- append() / prepend() — добавляют элемент в конец или начало родительского - элемента (современный подход).
---


