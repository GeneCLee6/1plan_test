export const validation = {
	businessName: (value) => {
		let error;
		if (!value.trim()) error = 'Business Name is required';
		return error;
	},
	firstName: (value) => {
		let error;
		if (!value.trim()) error = 'First name is required';
		return error;
	},
	lastName: (value) => {
		let error;
		if (!value.trim()) error = 'Last name is required';
		return error;
	},
	email: (value) => {
		let error;
		if (!value.trim()) error = 'Email is required';
		return error;
	},
	password: (value) => {
		let error;
		if (!value.trim()) error = "Password is required";
		if (value.trim().length < 6) error = "Password should have at least 6 characters";
		return error;
	}
};
