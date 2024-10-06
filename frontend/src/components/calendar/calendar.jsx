import { useState } from 'react';
import Calendar from 'react-calendar';
import { Modal } from '../modal/modal';
import { Icon } from '../icon/icon';
import './Calendar.css';

export const CalendarIcon = ({ value, onChange, selectRange = false }) => {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	return (
		<>
			<Icon
				id="fa-calendar-o"
				isClickable={true}
				size="30px"
				margin="0 0 0 10px"
				onClick={() => setIsCalendarOpen(true)}
			/>
			{isCalendarOpen && (
				<Modal onClose={() => setIsCalendarOpen(false)}>
					<Calendar
						selectRange={selectRange}
						onChange={onChange}
						value={value}
					/>
				</Modal>
			)}
		</>
	);
};
