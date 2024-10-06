const express = require("express");
const {
  addOperation,
  editOperation,
  deleteOperation,
  getOperations,
} = require("../contollers/operation");
const authenticated = require("../middlewares/authenticated");
const mapOperation = require("../helpers/mapOperation");
const mapAccount = require("../helpers/mapAccount");

const router = express.Router({ mergeParams: true });

router.post("/", authenticated, async (req, res) => {
  const { newOperation, updatedAccount } = await addOperation({
    userId: req.user.id,
    accountId: req.body.accountId,
    categoryId: req.body.categoryId,
    comment: req.body?.comment,
    count: req.body.count,
    publishedAt: req.body.publishedAt,
  });

  res.send({
    data: {
      operation: mapOperation(newOperation),
      account: mapAccount(updatedAccount),
    },
  });
});

router.patch("/:id", authenticated, async (req, res) => {
  const { newOperation, updatedAccounts } = await editOperation(req.params.id, {
    accountId: req.body.accountId,
    categoryId: req.body.categoryId,
    comment: req.body?.comment,
    count: req.body.count,
    publishedAt: req.body.publishedAt,
  });

  res.send({
    data: {
      operation: mapOperation(newOperation),
      accounts: updatedAccounts.map(mapAccount),
    },
  });
});

router.delete("/:id", authenticated, async (req, res) => {
  const updatedAccount = await deleteOperation(req.params.id);

  res.send({ error: null, data: { account: mapAccount(updatedAccount) } });
});

router.get("/", authenticated, async (req, res) => {
  const { operations, lastPage } = await getOperations(
    req.user.id,
    req.query.filter,
    req.query.limit,
    req.query.page
  );

  res.send({
    data: {
      lastPage,
      operations: operations.map(mapOperation),
    },
  });
});

module.exports = router;
