export const getFirstDayOfWeek = (date) => {
	const firstDayOfWeek = new Date(date);
	const dayOfWeek = date.getDay();

	const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
	firstDayOfWeek.setDate(date.getDate() - daysToSubtract);

	return firstDayOfWeek;
};
