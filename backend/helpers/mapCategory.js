module.exports = function (category) {
  return {
    id: category._id,
    title: category.title,
    type: category.type,
    icon: category.icon,
  };
};
