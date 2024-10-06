import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, DoughnutChart } from './components';
import { selectOperations } from '../../../../selectors';
import { dividedToCategories } from '../../../../utils';
import styles from './charts.module.scss';

export const Charts = () => {
	const operations = useSelector(selectOperations);
	const { expenses, incomes } = dividedToCategories(operations);
	const [isActive, setIsActive] = useState(false);

	const chartData = isActive ? expenses : incomes;

	return (
		<div className={styles.chartsContainer}>
			<div className={styles.buttons}>
				<button
					className={
						!isActive ? `${styles.btn} ${styles.activeBtn}` : styles.btn
					}
					onClick={() => setIsActive(false)}
					aria-pressed={!isActive}
				>
					Доходы
				</button>
				<button
					className={
						isActive ? `${styles.btn} ${styles.activeBtn}` : styles.btn
					}
					onClick={() => setIsActive(true)}
				>
					Расходы
				</button>
			</div>
			<div className={styles.charts}>
				<BarChart list={chartData} />
				<DoughnutChart list={chartData} />
			</div>
		</div>
	);
};
