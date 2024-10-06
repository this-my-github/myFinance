const { EXPENSES, INCOMES } = require("../constants/types");
const { addAccount } = require("../contollers/account");
const { addCategory } = require("../contollers/category");

const generateAddAcount = (userId, title, icon) =>
  addAccount({
    userId,
    title,
    count: 0,
    icon,
  });

const generateaddCategory = (userId, title, type, icon) =>
  addCategory({
    userId,
    title,
    type,
    icon,
  });

const generateBaseData = async (userId) => {
  await generateAddAcount(userId, "Наличные", "fa-paypal");
  await generateAddAcount(userId, "Карта", "fa-credit-card");

  await generateaddCategory(userId, "Здоровье", EXPENSES, "fa-medkit");
  await generateaddCategory(userId, "Дом", EXPENSES, "fa-home");
  await generateaddCategory(userId, "Кафе", EXPENSES, "fa-cutlery");
  await generateaddCategory(userId, "Образование", EXPENSES, "fa-book");
  await generateaddCategory(userId, "Подарки", EXPENSES, "fa-gift");
  await generateaddCategory(userId, "Продукты", EXPENSES, "fa-shopping-cart");
  await generateaddCategory(userId, "Транспорт", EXPENSES, "fa-car");
  await generateaddCategory(userId, "Путешествия", EXPENSES, "fa-plane");
  await generateaddCategory(userId, "Связь", EXPENSES, "fa-phone");
  await generateaddCategory(userId, "Подписки", EXPENSES, "fa-tv");

  await generateaddCategory(userId, "Зарплата", INCOMES, "fa-money");
  await generateaddCategory(userId, "Подарок", INCOMES, "fa-gift");
  await generateaddCategory(
    userId,
    "Проценты по вкладу",
    INCOMES,
    "fa-briefcase"
  );
};

module.exports = {
  generateBaseData,
};
