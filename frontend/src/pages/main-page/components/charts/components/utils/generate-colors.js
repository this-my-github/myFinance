export const baseColors = [
	'rgba(255, 99, 132, 0.6)', // Розовый
	'rgba(54, 162, 235, 0.6)', // Голубой
	'rgba(255, 206, 86, 0.6)', // Желтый
	'rgba(75, 192, 192, 0.6)', // Бирюзовый
	'rgba(153, 102, 255, 0.6)', // Фиолетовый
	'rgba(255, 159, 64, 0.6)', // Оранжевый
	'rgba(201, 203, 207, 0.6)', // Серый
];

const getRandomColor = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const a = 0.6;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const generateColors = (numColors) => {
	const generatedColors = [];

	for (let i = 0; i < Math.min(numColors, baseColors.length); i++) {
		generatedColors.push(baseColors[i]);
	}

	for (let i = baseColors.length; i < numColors; i++) {
		generatedColors.push(getRandomColor());
	}

	return generatedColors;
};
