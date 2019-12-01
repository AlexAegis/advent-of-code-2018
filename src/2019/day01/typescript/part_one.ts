import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = async (input: string) => {
	// const nums = [...input].filter(c => /^(\+|-)?[0-9]+/.test(c)).map(c => Number(c)); // one line
	const nums = input.split(/\r?\n/).map(s => Number(s)); // multiline

	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === nums[(i + 1) % nums.length]) {
			sum += nums[i];
		}
	}
	return sum;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
