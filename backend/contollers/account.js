const Account = require("../models/Account");
const Operation = require("../models/Operation");

//add
async function addAccount(account) {
  const newAccount = await Account.create(account);

  return newAccount;
}

//edit
async function editAccount(id, account, type = "none") {
  const oldAccount = await getAccount(id);
  let newCount;

  switch (type) {
    case "plus":
      newCount = oldAccount.count + account.count;
      break;
    case "minus":
      newCount = oldAccount.count - account.count;
      break;
    case "none":
      newCount = account.count;
      break;

    default:
      break;
  }

  const newAccount = await Account.findByIdAndUpdate(
    id,
    { ...account, count: newCount },
    {
      returnDocument: "after",
    }
  );

  return newAccount;
}

//delete
//удаляем счёт со всеми транзакциями
async function deleteAccount(id) {
  await Operation.deleteMany({ accountId: id });
  await Account.deleteOne({ _id: id });
}

//get list
async function getAccounts(userId) {
  const accounts = await Account.find({ userId });

  return accounts;
}

//get
async function getAccount(id) {
  const account = await Account.findById(id);

  return account;
}

module.exports = {
  addAccount,
  editAccount,
  deleteAccount,
  getAccounts,
  getAccount,
};
