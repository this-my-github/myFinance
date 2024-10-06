const express = require("express");
const {
  addAccount,
  editAccount,
  deleteAccount,
  getAccounts,
} = require("../contollers/account");
const authenticated = require("../middlewares/authenticated");
const mapAccount = require("../helpers/mapAccount");

const router = express.Router({ mergeParams: true });

router.post("/", authenticated, async (req, res) => {
  const newAccount = await addAccount({
    userId: req.user.id,
    title: req.body.title,
    count: req.body.count,
    icon: req.body.icon,
  });

  res.send({ data: mapAccount(newAccount) });
});

router.patch("/:id", authenticated, async (req, res) => {
  const newAccount = await editAccount(
    req.params.id,
    {
      title: req.body.title,
      count: req.body.count,
      icon: req.body.icon,
    },
    req.body.type
  );

  res.send({ data: mapAccount(newAccount) });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteAccount(req.params.id);

  res.send({ error: null });
});

router.get("/", authenticated, async (req, res) => {
  const accounts = await getAccounts(req.user.id);

  res.send({ data: accounts.map(mapAccount) });
});

module.exports = router;
