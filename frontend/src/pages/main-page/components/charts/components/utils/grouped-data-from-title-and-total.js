import { calculateTotal } from './calculate-total';
import { parseDate } from './parse-date';

export const groupedDataFromTitleAndTotal = (list, input) => {
	let groupedData = {};

	if (Array.isArray(input) && input.length === 2) {
		const [startDate, endDate] = input;

		// Группировка данных по заголовкам и суммирование значений
		groupedData = list.reduce((accumulator, { title, publishedAt, count }) => {
			const date = parseDate(publishedAt);

			// Проверяем, попадает ли дата в указанный диапазон
			if (date >= startDate && date <= endDate) {
				if (!accumulator[title]) {
					accumulator[title] = 0;
				}
				accumulator[title] += count;
			}

			return accumulator;
		}, {});
	} else {
		// Обработка одиночной даты
		const date = input;

		groupedData = list.reduce((accumulator, { title, publishedAt, count }) => {
			const currentDate = parseDate(publishedAt);

			// Проверяем, совпадает ли дата с одиночной датой
			if (currentDate.getTime() === date.getTime()) {
				if (!accumulator[title]) {
					accumulator[title] = 0; // Инициализируем значение для заголовка
				}
				accumulator[title] += count; // Суммируем значения по заголовкам
			}

			return accumulator;
		}, {});
	}

	const labels = Object.keys(groupedData);
	const dataValues = labels.map((label) => groupedData[label]);
	const total = calculateTotal(dataValues);

	const labelsWithPercentage = labels.map((label, index) => {
		const percentage = ((dataValues[index] / total) * 100).toFixed(2);
		return `${label}: ${percentage}%`;
	});

	return { labels, labelsWithPercentage, dataValues, total };
};
