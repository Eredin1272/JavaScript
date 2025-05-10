import { transactions } from "./transactions.js";

/**
 * Добавляет новую транзакцию в массив и отображает её в таблице.
 * @param {Transaction} transaction - Объект транзакции для добавления.
 */
export function addTransaction(transaction) {
    /**
     * Получает элемент <tbody> таблицы для добавления новой строки.
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#transactions-table tbody');

    // Добавление транзакции в массив
    transactions.push(transaction);

    // Создание новой строки таблицы
    const row = document.createElement('tr');
    row.style.color = transaction.amount > 0 ? 'green' : 'red'; // Цвет текста: зелёный для доходов, красный для расходов
    row.dataset.description = transaction.description; // Сохранение полного описания в dataset

    // Формирование краткого описания (первые 4 слова)
    const shortDescription = transaction.description.split(' ').slice(0, 4).join(' ');

    // Заполнение строки данными транзакции
    row.innerHTML = `
        <td>${new Date(transaction.date).toLocaleString()}</td>
        <td>${transaction.category}</td>
        <td>${shortDescription}</td>
        <td><button class="delete-button" data-id="${transaction.id}">Удалить</button></td>
    `;

    // Добавление строки в таблицу
    tableBody.appendChild(row);
}

/**
 * Считает общую сумму всех транзакций и отображает её на странице.
 */
export function calculateTotal() {
    /**
     * Вычисляет общую сумму транзакций с помощью метода reduce.
     * @type {number}
     */
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    /**
     * Находит элемент для отображения общей суммы.
     * @type {HTMLElement}
     */
    const totalElement = document.getElementById('total');

    // Отображение общей суммы с двумя знаками после запятой
    totalElement.textContent = total.toFixed(2);
}