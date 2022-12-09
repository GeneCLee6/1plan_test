export const validation = {
	email: (value) => {
		let error;
		if (!value.trim()) error = 'Email is required';
		return error;
	},
	password: (value) => {
		let error;
		if (!value.trim()) error = 'Password is required';
		return error;
	},
};
