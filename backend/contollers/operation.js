const Operation = require("../models/Operation");
const { EXPENSES } = require("../constants/types");
const { editAccount } = require("./account");

//add
async function addOperation(operation) {
  let newOperation = await Operation.create(operation);
  newOperation = await getOperation(newOperation._id);

  const updatedCount =
    newOperation.categoryId.type === EXPENSES
      ? newOperation.accountId.count - newOperation.count
      : newOperation.accountId.count + newOperation.count;

  const updatedAccount = await editAccount(newOperation.accountId._id, {
    count: updatedCount,
  });

  return { newOperation, updatedAccount };
}
//edit
async function editOperation(id, operation) {
  let oldOperation = await getOperation(id);
  let newOperation = await Operation.findByIdAndUpdate(id, operation, {
    returnDocument: "after",
  });
  newOperation = await getOperation(newOperation._id);

  if (oldOperation.accountId.title === newOperation.accountId.title) {
    let updatedCount =
      newOperation.categoryId.type === EXPENSES
        ? newOperation.accountId.count - newOperation.count + oldOperation.count
        : newOperation.accountId.count +
          newOperation.count -
          oldOperation.count;

    const updatedAccount = await editAccount(newOperation.accountId._id, {
      count: updatedCount,
    });

    return { newOperation, updatedAccounts: [updatedAccount] };
  } else {
    let updatedCountForOldAccount =
      newOperation.categoryId.type === EXPENSES
        ? oldOperation.accountId.count - oldOperation.count
        : oldOperation.accountId.count - oldOperation.count;

    let updatedCountForNewAccount =
      newOperation.categoryId.type === EXPENSES
        ? newOperation.accountId.count - newOperation.count
        : newOperation.accountId.count + newOperation.count;

    const updatedOldAccount = await editAccount(oldOperation.accountId._id, {
      count: updatedCountForOldAccount,
    });
    const updatedNewAccount = await editAccount(newOperation.accountId._id, {
      count: updatedCountForNewAccount,
    });
    return {
      newOperation,
      updatedAccounts: [updatedOldAccount, updatedNewAccount],
    };
  }
}

//delete
async function deleteOperation(id) {
  let newOperation = await getOperation(id);
  const updatedCount =
    newOperation.categoryId.type === EXPENSES
      ? newOperation.accountId.count + newOperation.count
      : newOperation.accountId.count - newOperation.count;

  const updatedAccount = await editAccount(newOperation.accountId._id, {
    count: updatedCount,
  });

  await Operation.deleteOne({ _id: id });

  return updatedAccount;
}

//get list with search and pagination
async function getOperations(
  userId,
  filter = "publishedAt",
  limit = 10,
  page = 1
) {
  if (filter === "по дате") {
    filter = "publishedAt";
  } else if ((filter = "по сумме")) {
    filter = "count";
  }

  const [operations, count] = await Promise.all([
    Operation.find({ userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ [filter]: -1 })
      .populate({
        path: "categoryId",
        select: ["type", "title", "icon"],
      })
      .populate({
        path: "accountId",
        select: "title",
      }),
    Operation.countDocuments({ userId }),
  ]);

  return {
    operations,
    lastPage: Math.ceil(count / limit),
  };
}

async function getOperation(id) {
  const operation = await Operation.findById(id)
    .populate({
      path: "categoryId",
      select: ["type", "title", "icon"],
    })
    .populate({
      path: "accountId",
      select: ["title", "count"],
    });

  return operation;
}

module.exports = {
  addOperation,
  editOperation,
  deleteOperation,
  getOperations,
};
