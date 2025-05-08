#  Отчет по лабораторной работе #2. Основы работы с массивами, функциями и объектами в JavaScript. 
**Тема:** Обработка массива объектов (транзакции) в JavaScript

##  Введение
В данной лабораторной работе реализован набор функций для анализа массива объектов транзакций. Каждая транзакция содержит данные о сумме, типе, дате, магазине и других параметрах. Цель — научиться работать с массивами объектов, фильтрацией, сортировкой, поиском и агрегированием данных.

---

##  Структура данных

- `main.js` - основной файл с реализацией функциональности.
---
Используется массив объектов `transactions`, где каждый объект описывает одну транзакцию со следующими свойствами:
---
- `transaction_id` (string) - уникальный идентификатор транзакции
- `transaction_date` (string) - дата транзакции в формате YYYY-MM-DD
- `transaction_amount` (number) - сумма транзакции
- `transaction_type` (string) - Тип транзакции: 'Доход' или 'Расход'
- `transaction_description` (string) - описание транзакции
- `merchant_name` (string) - Название магазина или сервиса
- `card_type` (string) - тип карты (`credit` или `debit`)

Используется массив объектов `transactions`, где каждый объект описывает одну транзакцию со следующими свойствами:
---

#  Использованные функции

### 1. Уникальные типы транзакций 

```js
function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
  }

```
 Используется `Set` для получения уникальных значений из `transaction_type`.

---

### 2. Общая сумма всех транзакций

```js
function calculateTotalAmount(transactions) {
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
  }
```
 Используется `reduce` для суммирования всех `transaction_amount`.

---

### 3. Фильтрация по дате транзакции

```js
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
```
 Фильтрация массива по полю `transaction_type`.

---

### 4. Фильтрация по типу транзакции

 ```js
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
  }
 ```

---

### 5. Транзакции в диапазоне дат

```js
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date >= start && date <= end;
    });
  }
```
 Преобразуем строки в объекты `Date` и фильтруем транзакции по диапазону.

---

### 6. Транзакции по магазину

```js
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
  }
```
 Фильтрация по полю `merchant_name`.

---

### 7. Средняя сумма транзакций

```js
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    return total / transactions.length;
  }
```
 Суммируем все суммы транзакций и делим на их количество.

---

### 8. Транзакции в диапазоне по сумме

```js
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => 
      transaction.transaction_amount >= minAmount &&
      transaction.transaction_amount <= maxAmount
    );
  }
```
 Фильтруем транзакции по условию суммы между `minAmount` и `maxAmount`.

---

### 9. Сумма дебетовых транзакций

```js
function calculateTotalDebitAmount(transactions) {
    return transactions
      .filter(transaction => transaction.card_type === "debit")
      .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
  }
```
 Фильтрация по `card_type === "debit"` и суммирование с помощью `reduce`.

---

### 10. Месяц с наибольшим числом транзакций

```js
function findMostTransactionsMonth(transactions) {
    const countByMonth = {};
  
    transactions.forEach(transaction => {
      const month = transaction.transaction_date.slice(0, 7); // YYYY-MM
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

```
 Группировка по месяцу (`YYYY-MM`), затем поиск месяца с максимумом.

---

### 11. Месяц с наибольшим числом дебетовых транзакций

```js
function findMostDebitTransactionMonth(transactions) {
    const countByMonth = {};
  
    transactions.forEach(transaction => {
      if (transaction.card_type === "debit") {
        const month = transaction.transaction_date.slice(0, 7); // YYYY-MM
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
```
 Аналогично пункту 10, но только для дебетовых транзакций.

---

### 12. Сравнение количества доходов и расходов

```js
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
```
 Подсчет количества "Доход" и "Расход", возвращается тот, что преобладает.

---

### 13. Транзакции до указанной даты

```js
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(transaction => new Date(transaction.transaction_date) < targetDate);
  }
```
 Фильтрация всех транзакций, дата которых меньше указанной.

---

### 14. Поиск транзакции по ID

```js
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id);
  }
```
 Используется `find` для поиска по `transaction_id`.

---

### 15. Массив описаний всех транзакций

```js
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
  }
```
 Используем `map`, чтобы собрать все `transaction_description` в новый массив.

---

##  Проверка результатов

Для проверки работы каждой функции выполнены соответствующие `console.log()` вызовы:

```js
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Общая сумма транзакций за 2025 год:", calculateTotalAmountByDate(transactions, 2025));
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
```
---
## Тесты
Первый массив транзакций:
```js
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
```
---
- **Уникальные типы транзакций:** `["Доходы", "Расходы"]` 
![Уникальные типы транзакций](../Lab2%20Britcov_Egor_JS/screenshots/1.png)
---
- **Общая сумма транзакций:**
![Общая сумма транзакций](../Lab2%20Britcov_Egor_JS/screenshots/2.png)
---
- **Общая сумма транзакций за выбранный период:**
![Общая сумма транзакций за выбранный период](../Lab2%20Britcov_Egor_JS/screenshots/3.png)
---
- **Только тип "Доходы":**
![Только тип "Доходы"](../Lab2%20Britcov_Egor_JS/screenshots/4.png)
---
- **Транзакции за выбранный месяц:**
![Транзакции за март](../Lab2%20Britcov_Egor_JS/screenshots/5.png)
---
- **Транзакции в выбранном магазине:**
![Транзакции в магазине "Bomba"](../Lab2%20Britcov_Egor_JS/screenshots/6.png)
---
- **Средняя сумма транзакций:**
![Средняя сумма транзакций](../Lab2%20Britcov_Egor_JS/screenshots/7.png)
---
- **Транзакции в указанном диапазоне сумм:**
![Диапазон сумм](../Lab2%20Britcov_Egor_JS/screenshots/8.png)
---
- **Общая сумма дебитовых карт:**
![Сумма дебитовых карт](../Lab2%20Britcov_Egor_JS/screenshots/9.png)
---
- **Месяц с наибольшим числом транзакций:**
![Месяц с наибольшим числом транзакций](../Lab2%20Britcov_Egor_JS/screenshots/10.png)
---
- **Месяц с наибольшим числом дебитовых транзакций:**
![Месяц с наибольшим числом дебитовых транзакций](../Lab2%20Britcov_Egor_JS/screenshots/11.png)
---
- **Каких транзакций больше:**
![Каких транзакций больше](../Lab2%20Britcov_Egor_JS/screenshots/12.png)
---
- **Транзакции до указанной даты:**
![Транзакции до 2025-04-01](../Lab2%20Britcov_Egor_JS/screenshots/13.png)
---
- **Транзакции по ID:**
![Транзакции по ID](../Lab2%20Britcov_Egor_JS/screenshots/14.png)
---
- **Описание всех транзакций:**
![Описание всех транзакций](../Lab2%20Britcov_Egor_JS/screenshots/15.png)
---
- **Тест с пустым массивом**
![Тест с пустым массивом](../Lab2%20Britcov_Egor_JS/screenshots/16.png)
---
### 1. Какие методы массивов можно использовать для обработки объектов в JavaScript?

- **map()** – Создает новый массив, трансформируя каждый элемент.

- **filter()** – Возвращает новый массив с элементами, соответствующими условию.

- **reduce()** – Позволяет вычислять агрегированные значения (например, сумму).

- **forEach()** – Итерация по массиву без возврата нового массива.

- **find()** – Ищет первый элемент, соответствующий условию.

- **findIndex()** – Возвращает индекс первого найденного элемента.

- **some()** – Проверяет, есть ли хотя бы один элемент, удовлетворяющий условию.

- **every()** – Проверяет, соответствуют ли все элементы условию.

- **sort()** – Сортирует массив (по умолчанию лексикографически).

- **slice()** – Создает новый массив, копируя часть существующего.

- **splice()** – Изменяет массив: удаляет, добавляет или заменяет элементы.
---
### 2.Как сравнивать даты в строковом формате в JavaScript?
Даты в строковом формате сравнивают, преобразовав их в объекты Date или сравнивая строки в формате `YYYY-MM-DD`:
```js
const date1 = new Date('2023-05-01');
const date2 = new Date('2022-12-31');

console.log(date1 > date2);  // true
```
---
Или, если формат ISO `YYYY-MM-DD`, можно сравнивать как строки:
```js
"2025-04-06" > "2025-04-01"
```




---
### 3.В чем разница между map(), filter() и reduce() при работе с массивами объектов?

- **map()** - используется, если нужно изменить структуру объектов или нужно получить новый массив значений.
- **filter()** - используется, если нужно отсортировать элементы, исходя из требуемого условия.
- **reduce()** - исползуется для поиска определенного значения, исходя из данных массива, например для поиска среднего значения, вычисления суммы значений и тому подобное.
##  Вывод

В ходе лабораторной работы были реализованы функции для анализа и обработки массива объектов. Применены современные методы работы с массивами в JavaScript:  
- `map()`  
- `filter()`  
- `reduce()`  
- `find()`  
- `Set`  

Работа показывает умение структурировать данные и извлекать из них нужную информацию программными методами.

---
