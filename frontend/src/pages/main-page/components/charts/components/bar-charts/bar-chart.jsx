import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { baseColors, getLabelsFromDateType, groupedDataFromDateType } from '../utils';
import { DATE_TYPE, MONTH_NAMES } from '../constants';
import styles from './bar-chart.module.css';
import { Button } from '../../../../../../components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const dateButtons = [
	{ type: DATE_TYPE.year, label: 'по годам' },
	{ type: DATE_TYPE.month, label: 'по месяцам' },
	{ type: DATE_TYPE.week, label: 'по неделям' },
	{ type: DATE_TYPE.day, label: 'по дням' },
];

export const BarChart = ({ list }) => {
	const currentDate = new Date();
	const colorMap = {};

	const [activeButton, setActiveButton] = useState(DATE_TYPE.month);

	const groupedData = groupedDataFromDateType(list, activeButton);
	const labels = getLabelsFromDateType(activeButton);

	const datasets = [];

	Object.keys(groupedData).forEach((key) => {
		Object.keys(groupedData[key]).forEach((title) => {
			if (!colorMap[title]) {
				colorMap[title] = baseColors[datasets.length % baseColors.length];
			}

			if (!datasets.find((dataset) => dataset.label === title)) {
				datasets.push({
					label: title,
					data: labels.map((label) => groupedData[label]?.[title] || 0),
					backgroundColor: colorMap[title],
					borderColor: colorMap[title].replace(/0.6/, '1'),
					borderWidth: 4,
				});
			}
		});
	});

	const data = {
		labels: labels.map((label) => label?.split('/')[0]),
		datasets: datasets,
	};

	const currentDateText =
		activeButton === DATE_TYPE.month
			? currentDate.getFullYear()
			: activeButton === DATE_TYPE.week
			? currentDate.getFullYear()
			: activeButton === DATE_TYPE.day
			? `${currentDate.getFullYear()} ${MONTH_NAMES[currentDate.getMonth()]}`
			: null;

	return (
		<div className={styles.container}>
			<div className={styles.dateContainer}>
				{dateButtons.map(({ type, label }) => (
					<Button
						key={type}
						active={activeButton === type}
						onClick={() => setActiveButton(type)}
						activeStyle={styles.active}
					>
						{label}
					</Button>
				))}
			</div>
			<Bar
				data={data}
				options={{
					plugins: {
						legend: { display: true },
					},
					scales: {
						x: {
							stacked: true,
						},
						y: {
							stacked: true,
						},
					},
				}}
			/>
			<div className={styles.dateTitle}>{currentDateText}</div>
		</div>
	);
};
