// Массив Транзакций

/**
 * @typedef {Object} Transaction
 * @property {string} id - Уникальный идентификатор транзакции.
 * @property {string} date - Дата и время транзакции в формате ISO (ISOString).
 * @property {number} amount - Сумма транзакции (отрицательная для расходов, положительная для доходов).
 * @property {string} category - Категория транзакции.
 * @property {string} description - Описание транзакции.
 */

/**
 * Массив транзакций, содержащий объекты типа {@link Transaction}.
 * @type {Transaction[]}
 */
export const transactions = [
    /**
     * Пример транзакции: Расход на депозит.
     * @type {Transaction}
     */
    {
        id: 't01',
        date: new Date().toISOString(),
        amount: -777,
        category: 'Деп',
        description: 'Слив в казике'
    },
    /**
     * Пример транзакции: Доход от социальной пенсии.
     * @type {Transaction}
     */
    {
        id: 't02',
        date: new Date().toISOString(),
        amount: 4036,
        category: 'Выплата',
        description: 'Социальная пенсия'
    },
    /**
     * Пример транзакции: Доход от стипендии.
     * @type {Transaction}
     */
    {
        id: 't03',
        date: new Date().toISOString(),
        amount: 656,
        category: 'Стипендия',
        description: 'Стипендия факультета Информатики'
    }
];