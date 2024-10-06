const express = require("express");
const {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
} = require("../contollers/category");
const authenticated = require("../middlewares/authenticated");
const mapCategory = require("../helpers/mapCategory");

const router = express.Router({ mergeParams: true });

router.post("/", authenticated, async (req, res) => {
  try {
    const newCategory = await addCategory({
      userId: req.user.id,
      title: req.body.title,
      type: req.body.type,
      icon: req.body.icon,
    });

    res.send({ error: null, data: mapCategory(newCategory) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.patch("/:id", authenticated, async (req, res) => {
  const newCategory = await editCategory(req.params.id, {
    title: req.body.title,
    icon: req.body.icon,
  });

  res.send({ data: mapCategory(newCategory) });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteCategory(req.params.id);

  res.send({ error: null });
});

router.get("/", authenticated, async (req, res) => {
  const categories = await getCategories(req.user.id);

  res.send({ data: categories.map(mapCategory) });
});

module.exports = router;
