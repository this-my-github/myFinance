import { CalendarIcon } from '../calendar/calendar';
import styles from './date-selector.module.scss';

export const DateSelector = ({ selectedDate, setSelectedDate, handleDateClick }) => {
	const today = new Date().toLocaleDateString();
	const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
	const theDayBeforeYesterday = new Date(
		Date.now() - 2 * 86400000,
	).toLocaleDateString();

	const adjustedSelectedDate =
		selectedDate === today || selectedDate === yesterday
			? theDayBeforeYesterday
			: selectedDate;

	return (
		<div className={styles.dates}>
			<button
				className={`${styles.date} ${
					selectedDate === today ? styles.selected : ''
				}`}
				onClick={(event) => handleDateClick(event, today)}
			>
				<div>{today.substring(0, 5)}</div>
				<div>{'сегодня'}</div>
			</button>
			<button
				className={`${styles.date} ${
					selectedDate === yesterday ? styles.selected : ''
				}`}
				onClick={(event) => handleDateClick(event, yesterday)}
			>
				<div>{yesterday.substring(0, 5)}</div>
				<div>{'вчера'}</div>
			</button>
			<button
				className={`${styles.date} ${
					selectedDate === adjustedSelectedDate ? styles.selected : ''
				}`}
				onClick={(event) => handleDateClick(event, adjustedSelectedDate)}
			>
				<div>{adjustedSelectedDate.substring(0, 5)}</div>
				<div>
					{adjustedSelectedDate === theDayBeforeYesterday
						? 'позавчера'
						: 'выбранная'}
				</div>
			</button>
			<CalendarIcon
				onChange={(date) => {
					setSelectedDate(date.toLocaleDateString());
				}}
			/>
		</div>
	);
};
