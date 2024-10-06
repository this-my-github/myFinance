const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const { generateBaseData } = require("../helpers/generate-base-data");

//register

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  generateBaseData(user.id);

  return { token, user };
}

// login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("Пользователя с таким логином не существует");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Неверный пароль");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

// edit (password)

async function edit(login, oldPassword, newPassword) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("Пользователя с таким логином не существует");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatch) {
    throw new Error("Неверный пароль");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { password: passwordHash },
    {
      returnDocument: "after",
    }
  );

  const token = generate({ id: user.id });

  return { token, user: newUser };
}

module.exports = {
  register,
  login,
  edit,
};
