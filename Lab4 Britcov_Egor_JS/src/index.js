import { generateId } from "./utils.js";
import { transactions } from "./transactions.js";
import { addTransaction, calculateTotal } from "./ui.js";

/**
 * Обрабатывает отправку формы для добавления новой транзакции.
 * @param {Event} e - Событие отправки формы.
 */
document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const amountInput = document.getElementById('amount');
  const categoryInput = document.getElementById('category');
  const descriptionInput = document.getElementById('description');
  const errorElement = document.getElementById('form-error');

  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();

  // Валидация
  if (isNaN(amount) || amount === 0) {
    errorElement.textContent = 'Введите корректную ненулевую сумму';
    errorElement.style.display = 'block';
    return;
  }

  if (!category) {
    errorElement.textContent = 'Выберите категорию';
    errorElement.style.display = 'block';
    return;
  }

  if (!description || description.length < 3) {
    errorElement.textContent = 'Введите корректное описание (минимум 3 символа)';
    errorElement.style.display = 'block';
    return;
  }

  // Сброс сообщения об ошибке
  errorElement.style.display = 'none';

  /**
   * Создает новый объект транзакции.
   * @param {string} id - Уникальный идентификатор транзакции.
   * @param {number} amount - Сумма транзакции.
   * @param {string} category - Категория транзакции.
   * @param {string} description - Описание транзакции.
   * @returns {Object} - Возвращает объект транзакции.
   */
  const newTransaction = {
    id: generateId(),
    date: new Date().toISOString(),
    amount,
    category,
    description
  };

  addTransaction(newTransaction);
  calculateTotal();
  e.target.reset();
});

/**
 * Обрабатывает клик на таблицу транзакций.
 * @param {Event} e - Событие клика.
 */
document.getElementById('transactions-table').addEventListener('click', (e) => {
    handleDeleteButtonClick(e);
    handleRowClick(e);
});

/**
 * Обрабатывает клик на кнопку удаления транзакции.
 * @param {Event} e - Событие клика.
 */
function handleDeleteButtonClick(e) {
    if (e.target.classList.contains('delete-button')) {
        const idToDelete = e.target.dataset.id;

        // Deleting from array
        const index = transactions.findIndex((t) => t.id === idToDelete);
        if (index !== -1) {
            transactions.splice(index, 1);
        }

        // Deleting rows from table
        e.target.closest('tr').remove();
        calculateTotal();
    }
}

/**
 * Обрабатывает клик на строку таблицы для отображения полного описания.
 * @param {Event} e - Событие клика.
 */
function handleRowClick(e) {
    if (e.target.tagName === 'TD') {
        const row = e.target.closest('tr');
        const fullDesc = row?.dataset.description;
        if (fullDesc) {
            document.getElementById('full-description').textContent = `Полное описание: ${fullDesc}`;
        }
    }
}