import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const nums = [...input].filter((c) => /^(\+|-)?[0-9]+/.test(c)).map((c) => parseInt(c, 10));
	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === nums[(i + 1) % nums.length]) {
			sum += nums[i];
		}
	}
	return sum;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 1177 ~0.9ms
}
