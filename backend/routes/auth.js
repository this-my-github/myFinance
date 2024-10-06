const express = require("express");
const { register, login, edit } = require("../contollers/user");
const authenticated = require("../middlewares/authenticated");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res.cookie("token", token, { httpOnly: true }).send({ error: null, user });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res.cookie("token", token, { httpOnly: true }).send({ error: null, user });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.patch("/changePassword", async (req, res) => {
  try {
    const { user, token } = await edit(
      req.body.login,
      req.body.oldPassword,
      req.body.newPassword
    );

    res.cookie("token", token, { httpOnly: true }).send({ error: null, user });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

router.get("/profile", authenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
