import { CATEGORY_TYPE } from '../constants';

export const dividedToCategories = (list) => {
	const expenses = [];
	const incomes = [];

	list.map((categories) => {
		categories.type === CATEGORY_TYPE.EXPENSES
			? expenses.push(categories)
			: incomes.push(categories);
	});
	return { expenses, incomes };
};
