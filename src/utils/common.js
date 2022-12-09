export const isObject = (objValue) => {
	return (
		objValue && typeof objValue === 'object' && objValue.constructor === Object
	);
};

export const isSectionAnswered = ({ objArr }) => {
	let isAnswered = false;
	if (objArr) {
		const arrArr = Object.values(objArr);
		arrArr.forEach((element) => {
			let countNotEmpty = 0;
			element.forEach((v, i) => {
				if (String(v).trim() != '') countNotEmpty++;
				if (element.length === countNotEmpty) isAnswered = true;
			});
		});
	}
	return isAnswered;
};
