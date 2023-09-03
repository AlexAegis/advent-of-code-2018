export const parse = (input: string): number[] => {
	return input
		.split(',')
		.filter((c) => /^([+-])?\d+/.test(c))
		.map((c) => Number.parseInt(c, 10));
};
