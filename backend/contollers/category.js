const Category = require("../models/Category");
const { EXPENSES, INCOMES } = require("../constants/types");
const Operation = require("../models/Operation");

//add
async function addCategory(category) {
  if (EXPENSES !== category.type && INCOMES !== category.type) {
    throw new Error("Wrong category type!");
  }
  const newCategory = await Category.create(category);

  return newCategory;
}

//edit
async function editCategory(id, category) {
  const newCategory = await Category.findByIdAndUpdate(id, category, {
    returnDocument: "after",
  });

  return newCategory;
}

//delete
//удаляем категорию со всеми транзакциями
async function deleteCategory(id) {
  await Operation.deleteMany({ categoryId: id });
  await Category.deleteOne({ _id: id });
}

//get list
async function getCategories(userId) {
  const accounts = await Category.find({ userId });

  return accounts;
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
};
