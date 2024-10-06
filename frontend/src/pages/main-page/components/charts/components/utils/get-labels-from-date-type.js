import { DATE_TYPE, DAYS_OF_WEEK, MONTH_NAMES } from '../constants';
import { getFirstDayOfWeek } from './get-first-day-of-week';

export const getLabelsFromDateType = (dateType) => {
	const currentDate = new Date();
	const labels = [];

	switch (dateType) {
		case DATE_TYPE.year:
			for (let i = 0; i < 5; i++) {
				labels.push(`${currentDate.getFullYear() - i}/`);
			}
			break;
		case DATE_TYPE.month:
			for (let i = 0; i < 5; i++) {
				const monthIndex = (currentDate.getMonth() - i + 12) % 12;
				labels.push(`${MONTH_NAMES[monthIndex]}/${currentDate.getFullYear()}`);
			}
			break;
		case DATE_TYPE.week:
			for (let i = 0; i < 5; i++) {
				const weekDate = new Date();
				weekDate.setDate(currentDate.getDate() - i * 7);
				const date = getFirstDayOfWeek(weekDate);
				labels.push(
					`${date.toLocaleDateString().substring(0, 5)}/${date.getFullYear()}`,
				);
			}
			break;
		case DATE_TYPE.day:
			const firstDayOfMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				1,
			);
			for (let d = firstDayOfMonth; d <= currentDate; d.setDate(d.getDate() + 1)) {
				labels.push(
					`${d.getDate()} ${
						DAYS_OF_WEEK[d.getDay()]
					}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
				);
			}
			break;
		default:
			break;
	}

	return labels;
};
