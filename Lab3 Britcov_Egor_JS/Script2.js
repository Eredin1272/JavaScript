/**
 * Функция-конструктор для создания предмета.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета.
 * @param {string} rarity - Редкость предмета ("rare", "epic", "legendary", "mythical").
 */
function Item(name, weight, rarity) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Название должно быть непустой строкой.");
    }
    if (typeof weight !== "number" || weight <= 0) {
      throw new Error("Вес должен быть положительным числом.");
    }
    if (
      typeof rarity !== "string" ||
      !["rare", "epic", "legendary", "mythical"].includes(rarity.toLowerCase())
    ) {
      throw new Error("Редкость должна быть одной из: rare, epic, legendary, mythical.");
    }
  
    this.name = name;
    this.weight = weight;
    this.rarity = rarity.toLowerCase();
  }
  
  /**
   * Возвращает строку с информацией о предмете.
   * @returns {string} Информация о предмете.
   */
  Item.prototype.getInfo = function() {
    return `| Предмет: ${this.name} | Вес: ${this.weight}kg | Редкость: ${this.rarity} |`;
  };
  
  /**
   * Устанавливает новый вес предмета.
   * @param {number} newWeight - Новый вес.
   */
  Item.prototype.setWeight = function(newWeight) {
    if (typeof newWeight !== "number" || newWeight <= 0) {
      throw new Error("Новый вес должен быть положительным числом.");
    }
    this.weight = newWeight;
  };
  
  /**
   * Устанавливает новую редкость предмета.
   * @param {string} newRarity - Новая редкость.
   */
  Item.prototype.setRarity = function(newRarity) {
    if (typeof newRarity !== "string" || !["rare", "epic", "legendary", "mythical"].includes(newRarity.toLowerCase())) {
      throw new Error("Редкость должна быть одной из: rare, epic, legendary, mythical.");
    }
    this.rarity = newRarity.toLowerCase();
  };
  
  /**
   * Функция-конструктор для создания оружия.
   * Наследует от Item и добавляет параметры урона и прочности.
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес оружия.
   * @param {string} rarity - Редкость оружия.
   * @param {number} damage - Урон оружия.
   * @param {number} durability - Прочность оружия (от 0 до 100).
   */
  function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity);  // Наследуем от Item
  
    if (typeof damage !== "number" || damage <= 0) {
      throw new Error("Урон должен быть положительным числом.");
    }
  
    if (typeof durability !== "number" || durability < 0 || durability > 100) {
      throw new Error("Прочность должна быть числом от 0 до 100.");
    }
  
    this.damage = damage;
    this.durability = durability;
  }
  
  // Наследуем методы от Item
  Weapon.prototype = Object.create(Item.prototype);
  Weapon.prototype.constructor = Weapon;
  
  /**
   * Возвращает строку с информацией об оружии.
   * @returns {string} Информация об оружии.
   */
  Weapon.prototype.getInfo = function() {
    return `| Предмет: ${this.name} | Вес: ${this.weight}kg | Редкость: ${this.rarity} | Урон: ${this.damage} | Прочность: ${this.durability}% |`;
  };
  
  /**
   * Использует оружие, уменьшая его прочность на 10.
   */
  Weapon.prototype.use = function() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) {
        this.durability = 0;
      }
    } else {
      console.log(`${this.name} сломан и не может быть использован.`);
    }
  };
  
  /**
   * Восстанавливает прочность оружия до 100.
   */
  Weapon.prototype.repair = function() {
    this.durability = 100;
  };
  
  // Пример использования
  
  try {
    // Создаем предметы
    const sword = new Item("Silver Sword", 3.5, "Rare");
    console.log(sword.getInfo());
    
    const mace = new Weapon("Spiked Mace", 5.0, "Legendary", 30, 70);
    console.log(mace.getInfo());
  
    // Используем оружие
    mace.use();
    console.log(mace.getInfo());
    
    // Чиним оружие
    mace.repair();
    console.log(mace.getInfo());
  
    // Пример с ошибкой: некорректный вес
    // const brokenItem = new Item("Bugged Rock", -1, "Common"); // выбросит ошибку
  
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
  