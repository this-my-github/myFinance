const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
