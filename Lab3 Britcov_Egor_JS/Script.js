// 1) Класс Item
/**
 * Класс Item представляет предмет в инвентаре.
 * @class
 */
class Item {
  /**
   * Создает новый предмет.
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес предмета.
   * @param {string} rarity - Редкость предмета ("rare", "epic", "legendary", "mythical").
   */
  constructor(name, weight, rarity) {
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
   * @returns {string}
   */
  getInfo() {
    return `| Предмет: ${this.name} | Вес: ${this.weight}kg | Редкость: ${this.rarity} |`;
  }

  /**
   * Устанавливает новый вес предмета.
   * @param {number} newWeight - Новый вес.
   */
  setWeight(newWeight) {
    if (typeof newWeight !== "number" || newWeight <= 0) {
      throw new Error("Новый вес должен быть положительным числом.");
    }
    this.weight = newWeight;
  }

  // Метод для изменения редкости
  setRarity(newRarity) {
    if (typeof newRarity !== "string" || !["rare", "epic", "legendary", "mythical"].includes(newRarity.toLowerCase())) {
      throw new Error("Редкость должна быть одной из: rare, epic, legendary, mythical.");
    }
    this.rarity = newRarity.toLowerCase();
  }

  // Метод для изменения урона, только если предмет имеет такой параметр
  setDamage(newDamage) {
    if (this.damage === undefined) {
      throw new Error("Этот предмет не имеет параметра урона.");
    }
    if (typeof newDamage !== "number" || newDamage <= 0) {
      throw new Error("Урон должен быть положительным числом.");
    }
    this.damage = newDamage;
  }
}

// 2) Класс Weapon (расширяет Item)
/**
 * Класс Weapon представляет оружие и расширяет Item.
 * @class
 * @extends Item
 */
class Weapon extends Item {
  /**
   * Создает новый объект оружия.
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес оружия.
   * @param {string} rarity - Редкость оружия.
   * @param {number} damage - Урон оружия.
   * @param {number} durability - Прочность оружия (от 0 до 100).
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);

    if (typeof damage !== "number" || damage <= 0) {
      throw new Error("Урон должен быть положительным числом.");
    }

    if (typeof durability !== "number" || durability < 0 || durability > 100) {
      throw new Error("Прочность должна быть числом от 0 до 100.");
    }

    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Возвращает строку с информацией об оружии.
   * @returns {string}
   */
  getInfo() {
    return `| Предмет: ${this.name} | Вес: ${this.weight}kg | Редкость: ${this.rarity} | Урон: ${this.damage} | Прочность: ${this.durability}% |`;
  }

  /**
   * Использует оружие, уменьшая его прочность на 10.
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) {
        this.durability = 0;
      }
      console.log(`Был использован ${this.name}. Прочность уменьшилась до ${this.durability}%.`);
      if (this.durability === 0) {
        console.log(`${this.name} сломан!`);
      }
    } else {
      console.log(`${this.name} сломан и не может быть использован.`);
    }
  }

  /**
   * Восстанавливает прочность оружия до 100.
   */
  repair() {
    if (this.durability < 100) {
      console.log(`Чиним ${this.name}...`);
      this.durability = 100;
      console.log(`${this.name} отремонтирован. Прочность востоновленна до ${this.durability}%.`);
  } else {
      console.log(`${this.name} предмет не нуждается в ремонте.`);
  }
}
}


// 3) Тестирование классов с изменением урона и редкости
try {
  console.log("========== Weapons List ==================");
  console.log("========== Testing Item Class ============");
  const sword = new Item("Silver Sword", 3.5, "Rare");
  console.log(sword.getInfo());
  sword.setWeight(9);
  sword.setRarity("legendary");
  console.log(`После изменений: ${sword.getInfo()}`);
  const bow = new Item("Golden Bow", 2.3, "Epic");
  console.log(bow.getInfo());

  console.log("========== Testing Weapon Class ==========");
  const mace = new Weapon("Spiked Mace", 5.0, "Legendary", 30, 70);
  console.log(mace.getInfo());
  // Изменяем урон и редкость оружия
  mace.setDamage(50);
  mace.setRarity("Epic");
  console.log(`После изменений: ${mace.getInfo()}`);
  
  for (let i = 0; i < 8; i++) {
    mace.use();
  }
  console.log(`Durability after using Spiked Mace: ${mace.durability}`);
  mace.repair();
  console.log(`Durability after repairing: ${mace.durability}`);

  const axe = new Weapon("Poseidon Axe", 8.7, "Mythical", 50, 90);
  console.log(axe.getInfo());
  axe.use();
  console.log(`Durability after using Poseidon Axe: ${axe.durability}`);
  axe.repair();
  console.log(`Durability after repairing: ${axe.durability}`);

  // 4) Опциональная цепочка
  console.log(mace?.damage);   // 50
  console.log(sword?.durability);  // undefined, без ошибки

  // Пример с ошибкой: некорректный вес
  // const brokenItem = new Item("Bugged Rock", -1, "Common"); // выбросит ошибку

} catch (error) {
  console.error("Ошибка при создании предмета:", error.message);
}
