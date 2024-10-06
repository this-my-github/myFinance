module.exports = function (operation) {
  return {
    id: operation._id,
    account: operation.accountId.title,
    categoryId: operation.categoryId._id,
    title: operation.categoryId.title,
    icon: operation.categoryId?.icon,
    type: operation.categoryId.type,
    comment: operation?.comment || "",
    count: operation.count,
    publishedAt: operation.publishedAt,
  };
};
