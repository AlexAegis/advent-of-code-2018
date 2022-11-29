import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parseBoundary } from './functions/parse.function.js';
import { Probe } from './model/probe.class.js';

export const runner = (input: string): number => {
	const line = input.lines()[0];
	const boundary = parseBoundary(line);
	const initialVelocities: Vec2[] = [];
	for (let x = 0; x < 500; x++) {
		for (let y = -250; y < 250; y++) {
			const initialVelocity = new Vec2(x, y);
			const probe = new Probe(initialVelocity.clone());
			let maxYposition = undefined;
			stepping: while (!probe.isPastPoint(boundary.bottomRight)) {
				const position = probe.step();
				if (!maxYposition || position.y > maxYposition.y) {
					maxYposition = position;
				}
				if (probe.isWithin(boundary)) {
					initialVelocities.push(initialVelocity);
					break stepping;
				}
			}
		}
	}
	return initialVelocities.length;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 3202 ~75.94ms
}