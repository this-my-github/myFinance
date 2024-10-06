import { DATE_TYPE, DAYS_OF_WEEK, MONTH_NAMES } from '../constants';
import { getFirstDayOfWeek } from './get-first-day-of-week';
import { parseDate } from './parse-date';

export const groupedDataFromDateType = (list, activeButton) =>
	list.reduce((accumulator, { title, publishedAt, count }) => {
		const date = parseDate(publishedAt);
		let key;

		switch (activeButton) {
			case DATE_TYPE.year:
				key = `${date.getFullYear()}/`;
				break;
			case DATE_TYPE.month:
				key = `${MONTH_NAMES[date.getMonth()]}/${date.getFullYear()}`;
				break;
			case DATE_TYPE.week:
				const firstDayOfWeek = getFirstDayOfWeek(date);
				key = `${firstDayOfWeek
					.toLocaleDateString()
					.substring(0, 5)}/${date.getFullYear()}`;
				break;
			case DATE_TYPE.day:
				key = `${date.getDate()} ${
					DAYS_OF_WEEK[date.getDay()]
				}/${date.getMonth()}/${date.getFullYear()}`;
				break;
			default:
				return accumulator;
		}

		if (!accumulator[key]) {
			accumulator[key] = {};
		}

		if (!accumulator[key][title]) {
			accumulator[key][title] = count;
		} else {
			accumulator[key][title] += count;
		}

		return accumulator;
	}, {});
