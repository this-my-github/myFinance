const mongoose = require("mongoose");

const OperationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  comment: {
    type: String,
  },
  count: {
    type: Number,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
});

const Operation = mongoose.model("Operation", OperationSchema);

module.exports = Operation;
