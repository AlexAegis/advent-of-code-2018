import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2019 - Day 18 - Part One', () => {
	it(`should resolve to 0 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(0);
	});

	it('should be that that both the first examples resolves to 0', async () => {
		expect(await runner('')).to.equal(0);
	});
});