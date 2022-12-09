export const getProgressColour = (progress) => {
	if (progress == 0) return 'red';
	if (progress == 100) return '#27D49B';
	if (progress > 0 && progress < 100) return '#FFC267';
};
