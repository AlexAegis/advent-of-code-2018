import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { execute } from './p1.js';
import { parse } from './parse.js';

export const p2 =
	(print = false) =>
	(input: string): number | undefined => {
		const i = new IntCodeComputer(parse(input));

		i.pushAsciiInput(
			[
				'OR A T', // T = A
				'AND B T', // T = A AND B
				'AND C T', // T = A AND B AND C
				'NOT T T', // T = !A OR !B OR !C
				'OR E J', // J = E
				'OR H J', //  J = E OR H
				'AND T J', // J = (!A OR !B OR !C) AND (E OR H)
				'AND D J', // J = (!A OR !B OR !C) AND (E OR H) AND D
				'RUN',
			].join('\n')
		);

		return execute(i, print);
	};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2(false), resources)}`); // 1141251258 ~168ms
}
