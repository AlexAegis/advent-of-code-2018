import { bench, read } from '@alexaegis/advent-of-code-lib';
import { chunksOfArray } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export enum COLOR {
	BLACK = 0,
	WHITE = 1,
	TRANSPARENT = 2,
}

export const runner = (input: string): string => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const layers = chunksOfArray(lines, h * w);

	const merged = layers.slice(1).reduce((a, n) => {
		for (let i = 0; i <= n.length; i++) {
			if (a[i] === COLOR.TRANSPARENT) {
				a[i] = n[i];
			}
		}
		return a;
	}, layers[0]);

	return (
		'\n' +
		chunksOfArray(merged, w)
			.map(
				(l) =>
					l
						.map((n) => {
							switch (n) {
								case COLOR.BLACK:
									return '`';
								case COLOR.WHITE:
									return '#';
								case COLOR.TRANSPARENT:
								default:
									return ' ';
							}
						})
						.join('') + '\n'
			)
			.join('')
	);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // LGYHB ~3.26ms
}