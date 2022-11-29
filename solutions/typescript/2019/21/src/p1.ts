import { bench, read } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const execute = (i: IntCodeComputer, print = false): number | undefined => {
	let r: number | undefined;
	let line = '';
	for (const o of i) {
		r = o;
		if (print && o !== undefined) {
			const c = String.fromCharCode(o);
			if (c === '\n') {
				console.log(line);
				line = '';
			} else {
				line += String.fromCharCode(o);
			}
		}
	}
	return r;
};

export const runner =
	(print = false) =>
	(input: string): number | undefined => {
		const i = new IntCodeComputer(parse(input));

		i.pushAsciiInput(
			[
				'OR A J', // J = A
				'AND B J', // J = A AND B
				'AND C J', // J = A AND B AND C
				'NOT J J', // J = !A OR !B OR !C
				'AND D J', // J = (!A OR !B OR !C) AND D
				'WALK',
			].join('\n')
		);

		return execute(i, print);
	};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner())}`); // 19352638 ~23ms
}