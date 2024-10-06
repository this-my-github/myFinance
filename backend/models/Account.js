const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
