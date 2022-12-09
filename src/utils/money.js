export const priceFormatter = (price, includeSymbol = true) => {
	const result = new Intl.NumberFormat('en-AU', {
		style: 'currency',
		currency: 'AUD',
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
	}).format(price);

	const tokenized = result.split('.');
	if (tokenized.length === 2) {
		const decimals = tokenized[1];
		if (decimals == 0) {
			if (!includeSymbol) return tokenized[0].substring(1);
			return tokenized[0];
		}
	}
	if (!includeSymbol) return result.substring(1);

	return result;
};
