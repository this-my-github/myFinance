import styles from './select-account.module.scss';

export const SelectAccount = ({
	optionsList,
	value,
	onChange,
	label = 'Счёт',
	width,
	left,
}) => (
	<div className={styles.selectContainer} style={{ width }}>
		<label htmlFor="income-expense-select" style={{ left }}>
			{label}
		</label>
		<select
			className={styles.select}
			style={{ width }}
			id="income-expense-select"
			value={value}
			onChange={onChange}
		>
			<option key={'Не задан'}>Не задан</option>
			{optionsList.map(({ id, title }) => (
				<option key={id}>{title}</option>
			))}
		</select>
	</div>
);
