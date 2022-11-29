import { bench, read } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input
		.split(/\r?\n\r?\n/)
		.map((rawGroup) => rawGroup.split(/\r?\n/g))
		.map((group) => {
			const letterCounts = [...group.join('')]
				.reduce(
					(map, letter) => map.set(letter, (map.get(letter) ?? 0) + 1),
					new Map<string, number>()
				)
				.values();
			return [...letterCounts].count((v) => v === group.length);
		})
		.reduce(sum);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 3299 ~2.2ms
}