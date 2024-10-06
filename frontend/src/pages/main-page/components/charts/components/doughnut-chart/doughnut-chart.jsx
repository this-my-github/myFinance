import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { baseColors, generateColors, groupedDataFromTitleAndTotal } from '../utils';
import { CalendarIcon } from '../../../../../../components';
import styles from './doughnut-chart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ list }) => {
	const currentDate = new Date();
	const [value, onChange] = useState([currentDate, currentDate]);
	const { labelsWithPercentage, dataValues, total } = groupedDataFromTitleAndTotal(
		list,
		value,
	);

	const hasData = dataValues.length > 0;

	const dataNew = {
		labels: labelsWithPercentage,
		datasets: [
			{
				label: 'Количество',
				data: hasData ? dataValues : [1],
				backgroundColor: hasData
					? generateColors(labelsWithPercentage.length)
					: baseColors[6],
				borderColor: hasData
					? generateColors(labelsWithPercentage.length).map((color) =>
							color.replace(/0.6/, '1'),
					  )
					: baseColors[6],
				borderWidth: 4,
			},
		],
	};

	return (
		<div className={styles.container}>
			<div className={styles.calendar}>
				<CalendarIcon value={value} onChange={onChange} selectRange={true} />
			</div>
			<div className={styles.chart}>
				<Doughnut data={dataNew} />
				<div className={styles.total}>
					{hasData ? `${total} Br` : 'В этом периоде не было операций'}
				</div>
			</div>
		</div>
	);
};
