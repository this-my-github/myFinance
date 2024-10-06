export const dateConverter = (inputDate) => {
	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];

	const [day, month, year] = inputDate.split('.').map(Number);
	if (!day || !month || !year) return '';

	return `${day} ${months[month - 1]} ${year} г.`;
};
