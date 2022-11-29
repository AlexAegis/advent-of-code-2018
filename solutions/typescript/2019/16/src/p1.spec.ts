import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe(`2019 - Day 16 - Part One`, () => {
	it(
		`should resolve to 30369587 when using the input`,
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(runner(input.input)).to.equal('30369587');
		},
		{ timeout: 20000 }
	);
});