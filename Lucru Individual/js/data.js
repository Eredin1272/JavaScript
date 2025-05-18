/**
 * @module data
 */

/**
 * @typedef {Object} Todo
 * @property {number} id - Уникальный идентификатор задачи (timestamp).
 * @property {string} text - Текст задачи.
 * @property {boolean} completed - Флаг выполнения задачи.
 * @property {string} createdAt - Дата создания задачи в формате ISO.
 */

/**
 * @global
 * @type {Todo[]}
 * @description Массив задач, доступный в модуле.
 */
export let todos = [];

/**
 * Загружает задачи из localStorage и обновляет массив `todos`.
 * Если данные найдены, они десериализуются из JSON.
 * @function
 */
export function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}

/**
 * Сохраняет текущий массив `todos` в localStorage.
 * Данные сериализуются в JSON.
 * @function
 */
export function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Добавляет новую задачу в массив `todos`, если текст корректен.
 * @function
 * @param {string} text - Текст новой задачи.
 * @returns {boolean} Возвращает true, если задача добавлена успешно; false — если текст некорректен (менее 3 символов).
 */
export function addTodo(text) {
  if (text.trim().length < 3) return false;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(todo);
  saveTodos();
  return true;
}

/**
 * Переключает статус выполнения задачи (`completed`) по ID.
 * @function
 * @param {number} id - Уникальный идентификатор задачи.
 */
export function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
}

/**
 * Удаляет задачу по ID из массива `todos`.
 * @function
 * @param {number} id - Уникальный идентификатор задачи.
 */
export function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
}

/**
 * Редактирует текст задачи по ID.
 * @function
 * @param {number} id - Уникальный идентификатор задачи.
 * @param {string} newText - Новый текст задачи.
 * @returns {boolean} Возвращает true, если изменение прошло успешно; false — если текст некорректен.
 */
export function editTodo(id, newText) {
  if (newText.trim().length < 3) return false;

  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  saveTodos();
  return true;
}
