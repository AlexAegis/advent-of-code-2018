import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import { asc } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import type { Args } from './args.interface.js';

export const p2 = (input: string, args?: Args): number => {
	const xmas = split(input).map((line) => parseInt(line, 10));
	const target = args?.target ?? NaN;
	for (let i = 0; i < xmas.length; i++) {
		let sum = xmas[i];
		let window = 1;
		const seq = [sum];
		while (sum <= target) {
			const num = xmas[i + window];
			sum += num;
			seq.push(num);
			if (sum === target) {
				const sorted = seq.sort(asc);
				return sorted[0] + sorted[sorted.length - 1];
			}
			window++;
		}
	}
	return 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources<Args>(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 28509180 ~2.8ms
}
