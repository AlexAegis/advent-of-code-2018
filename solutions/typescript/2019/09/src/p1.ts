import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 = (input: string): string =>
	new IntCodeComputer(parse(input)).withInput(1).execute().join(',');

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 3507134798 ~1.62ms
}
