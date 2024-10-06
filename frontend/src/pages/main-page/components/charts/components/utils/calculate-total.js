export const calculateTotal = (data) => {
	return data.length === 0
		? 0
		: data.reduce((accumulator, currentValue) => accumulator + currentValue);
};
