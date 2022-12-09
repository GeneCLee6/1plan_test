export const validation = {
	email: (value) => {
		let error;
		if (!value.trim()) error = 'Email is required';
		return error;
	},
};
