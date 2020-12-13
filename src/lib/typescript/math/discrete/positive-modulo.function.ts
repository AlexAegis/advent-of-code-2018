export const posMod = (n: number, m: number): number => {
	const mod = n % m;
	return mod >= 0 ? mod : (mod + m) % m;
};

export const posModBigInt = (n: bigint, m: bigint): bigint => {
	const mod = n % m;
	return mod >= 0 ? mod : (mod + m) % m;
};
