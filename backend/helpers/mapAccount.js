module.exports = function (account) {
  return {
    id: account._id,
    title: account.title,
    count: account.count,
    icon: account.icon,
  };
};
