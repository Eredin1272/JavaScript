import { todos, addTodo, toggleComplete, deleteTodo, editTodo } from './data.js';

// DOM-элементы
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');

/**
 * @function renderTodos
 * @description Отрисовывает список задач с учётом фильтрации, поиска и сортировки.
 * Использует глобальный массив `todos` и текущие значения DOM-элементов управления.
 * Вызывается при изменении фильтра, ввода в поиск или добавлении/удалении задачи.
 */
export function renderTodos() {
  list.innerHTML = '';

  /** @type {Array<Object>} */
  let filtered = [...todos];

  const filterValue = filterSelect.value;
  if (filterValue === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (filterValue === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  const searchValue = searchInput.value.trim().toLowerCase();
  if (searchValue) {
    filtered = filtered.filter(t => t.text.toLowerCase().includes(searchValue));
  }

  const sortValue = sortSelect.value;
  if (sortValue === 'az') {
    filtered.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortValue === 'za') {
    filtered.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sortValue === 'date-asc') {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortValue === 'date-desc') {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <div class="todo-item">
        <span class="number">${index + 1}</span>
        <span class="text">${todo.text}</span>
        <span class="date">${new Date(todo.createdAt).toLocaleDateString()}</span>
        <div class="actions">
          <button class="edit">Редактировать</button>
          <button class="complete">${todo.completed ? 'Отменить' : 'Выполнить'}</button>
          <button class="delete">Удалить</button>
        </div>
      </div>
    `;

    li.querySelector('.edit').addEventListener('click', () => handleEdit(todo.id));
    li.querySelector('.complete').addEventListener('click', () => handleToggle(todo.id));
    li.querySelector('.delete').addEventListener('click', () => handleDelete(todo.id));

    list.appendChild(li);

    if (index < filtered.length - 1) {
      const separator = document.createElement('hr');
      separator.className = 'todo-separator';
      list.appendChild(separator);
    }
  });
}

/**
 * @event input#search-input:input
 * @description Обновляет отображение списка задач при вводе текста в поиск.
 */
searchInput.addEventListener('input', renderTodos);

/**
 * @event select#filter-select:change
 * @description Обновляет отображение списка задач при изменении фильтра.
 */
filterSelect.addEventListener('change', renderTodos);

/**
 * @event select#sort-select:change
 * @description Обновляет отображение списка задач при изменении сортировки.
 */
sortSelect.addEventListener('change', renderTodos);

/**
 * @event form#todo-form:submit
 * @param {SubmitEvent} e - Событие отправки формы
 * @description Добавляет новую задачу из input-поля. Минимум 3 символа.
 */
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text) {
    const success = addTodo(text);
    if (success) {
      input.value = '';
      renderTodos();
    } else {
      alert('Минимум 3 символа!');
    }
  }
});

/**
 * @function handleEdit
 * @param {string} id - ID задачи
 * @description Обрабатывает редактирование задачи через prompt. Минимум 3 символа.
 */
function handleEdit(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const newText = prompt('Измените текст задачи:', todo.text);
  if (newText === null) return;

  const success = editTodo(id, newText);
  if (!success) {
    alert('Текст должен содержать минимум 3 символа');
  }

  renderTodos();
}

/**
 * @function handleToggle
 * @param {string} id - ID задачи
 * @description Переключает статус выполнения задачи.
 */
function handleToggle(id) {
  toggleComplete(id);
  renderTodos();
}

/**
 * @function handleDelete
 * @param {string} id - ID задачи
 * @description Удаляет задачу по ID.
 */
function handleDelete(id) {
  deleteTodo(id);
  renderTodos();
}
