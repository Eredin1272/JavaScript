/**
 * @typedef {Object} Transaction
 * @property {string} transaction_id - Уникальный идентификатор 
 * @property {string} transaction_date - Дата транзакции 
 * @property {number} transaction_amount - Сумма транзакции
 * @property {string} transaction_type - Тип транзакции: 'Доход' или 'Расход'
 * @property {string} transaction_description - Описание транзакции
 * @property {string} merchant_name - Название магазина или сервиса
 * @property {string} card_type - Тип карты: 'credit' или 'debit'
 */

/** @type {Transaction[]} */
const transactions = [
    {
      transaction_id: "fan01",
      transaction_date: "2025-04-06",
      transaction_amount: 920,
      transaction_type: "Доход",
      transaction_description: "Начисление",
      merchant_name: "Victoria Bank",
      card_type: "debit"
    },
    {
      transaction_id: "fan02",
      transaction_date: "2025-03-29",
      transaction_amount: 750,
      transaction_type: "Расход",
      transaction_description: "Приобретение товара",
      merchant_name: "Bomba",
      card_type: "credit"
    },
    {
      transaction_id: "fan03",
      transaction_date: "2025-04-01",
      transaction_amount: 70,
      transaction_type: "Расход",
      transaction_description: "Приобретение товара",
      merchant_name: "Color Cloud",
      card_type: "debit"
    }
  ];

  /**
 * Возвращает массив уникальных типов транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string[]} Уникальные типы транзакций
 */
function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
  }

  /**
 * Вычисляет сумму всех транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Общая сумма
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
  }

  /**
 * Вычисляет общую сумму транзакций за указанный год, месяц и день.
 * Если параметр отсутствует, производится расчет по остальным.
 *
 * @param {Transaction[]} transactions - Массив объектов транзакций
 * @param {number} [year] - Год для фильтрации (необязательный)
 * @param {number} [month] - Месяц для фильтрации (необязательный)
 * @param {number} [day] - День для фильтрации (необязательный)
 * @returns {number} Сумма транзакций за указанный год, месяц и день
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions.reduce((sum, transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    
    // Проверяем, соответствует ли дата параметрам (год, месяц, день)
    const matchesYear = year ? transactionDate.getFullYear() === year : true;
    const matchesMonth = month ? transactionDate.getMonth() + 1 === month : true; // Месяцы начинаются с 0
    const matchesDay = day ? transactionDate.getDate() === day : true;

    // Если все параметры совпадают, добавляем сумму транзакции
    if (matchesYear && matchesMonth && matchesDay) {
      return sum + transaction.transaction_amount;
    }
    return sum;
  }, 0);
}

  /**
 * Возвращает транзакции указанного типа.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} type - Тип транзакции: 'Доход' или 'Расход'
 * @returns {Transaction[]} Транзакции соответствующего типа
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
  }

  /**
 * Возвращает транзакции, совершённые в указанном диапазоне дат.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} startDate - Начальная дата (в формате YYYY-MM-DD)
 * @param {string} endDate - Конечная дата (в формате YYYY-MM-DD)
 * @returns {Transaction[]} Транзакции в указанном диапазоне
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date >= start && date <= end;
    });
  }

  /**
 * Возвращает транзакции по названию магазина или сервиса.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} merchantName - Название магазина
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
  }

  /**
 * Возвращает среднюю сумму транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Средняя сумма
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    return total / transactions.length;
  }

/**
 * Возвращает транзакции в указанном диапазоне сумм.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {number} minAmount - Минимальная сумма
 * @param {number} maxAmount - Максимальная сумма
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => 
      transaction.transaction_amount >= minAmount &&
      transaction.transaction_amount <= maxAmount
    );
  }

/**
 * Вычисляет сумму всех дебетовых транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Общая сумма дебетовых транзакций
 */
function calculateTotalDebitAmount(transactions) {
    return transactions
      .filter(transaction => transaction.card_type === "debit")
      .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
  }

/**
 * Находит месяц с наибольшим количеством транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string} Месяц в формате 'YYYY-MM'
 */
function findMostTransactionsMonth(transactions) {
    const countByMonth = {};
  
    transactions.forEach(transaction => {
      const month = transaction.transaction_date.slice(0, 7); 
      countByMonth[month] = (countByMonth[month] || 0) + 1;
    });
  
    let maxMonth = null;
    let maxCount = 0;
  
    for (const month in countByMonth) {
      if (countByMonth[month] > maxCount) {
        maxCount = countByMonth[month];
        maxMonth = month;
      }
    }
  
    return maxMonth;
  }

  /**
 * Возвращает месяц с наибольшим количеством дебетовых транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string} Месяц в формате 'YYYY-MM'
 */
function findMostDebitTransactionMonth(transactions) {
    const countByMonth = {};
  
    transactions.forEach(transaction => {
      if (transaction.card_type === "debit") {
        const month = transaction.transaction_date.slice(0, 7); 
        countByMonth[month] = (countByMonth[month] || 0) + 1;
      }
    });
  
    let maxMonth = null;
    let maxCount = 0;
  
    for (const month in countByMonth) {
      if (countByMonth[month] > maxCount) {
        maxCount = countByMonth[month];
        maxMonth = month;
      }
    }
  
    return maxMonth;
  }

  
  /**
 * Определяет, каких транзакций больше: "Доход" или "Расход".
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string} 'Доход', 'Расход' или 'equal'
 */
function mostTransactionTypes(transactions) {
    let income = 0;
    let expense = 0;
  
    transactions.forEach(transaction => {
      if (transaction.transaction_type === "Доход") income++;
      else if (transaction.transaction_type === "Расход") expense++;
    });
  
    if (income > expense) return "Доход";
    if (expense > income) return "Расход";
    return "equal";
  }

  /**
 * Возвращает транзакции до указанной даты.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} date - Дата в формате YYYY-MM-DD
 * @returns {Transaction[]} Найденные транзакции
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(transaction => new Date(transaction.transaction_date) < targetDate);
  }

  /**
 * Возвращает транзакцию по её уникальному идентификатору.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} id - Идентификатор транзакции
 * @returns {Transaction | undefined} Найденная транзакция или undefined
 */
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id);
  }

  /**
 * Возвращает массив описаний транзакций.
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string[]} Описания транзакций
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
  }

  
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Общая сумма транзакций за апрель 2025 год:", calculateTotalAmountByDate(transactions, 2025, 4));
console.log("Только доходы:", getTransactionByType(transactions, "Доход"));
console.log("Транзакции за март:", getTransactionsInDateRange(transactions, "2025-03-01", "2025-03-31"));
console.log("Транзакции в магазине Bomba:", getTransactionsByMerchant(transactions, "Bomba"));
console.log("Средняя сумма транзакций:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции от 100 до 800:", getTransactionsByAmountRange(transactions, 100, 800));
console.log("Общая сумма по дебетовым картам:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наибольшим числом транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с наибольшим числом дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("Каких транзакций больше:", mostTransactionTypes(transactions));
console.log("Транзакции до 2025-04-01:", getTransactionsBeforeDate(transactions, "2025-04-01"));
console.log("Поиск транзакции по ID (fan02):", findTransactionById(transactions, "fan02"));
console.log("Описание всех транзакций:", mapTransactionDescriptions(transactions));

 // Тестирование на пустом массиве
console.log("Тест для пустого массива:");
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes([])); // []
console.log("Общая сумма транзакций:", calculateTotalAmount([])); // 0
console.log("Среднее значение транзакций:", calculateAverageTransactionAmount([])); // 0  
