import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2021 - Day 6 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(361169);
	});

	describe('example', () => {
		it('should resolve to 26 after 18 days', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(await runner(input.input, 18)).to.equal(26);
		});
		it('should resolve to 5934 after 80 days', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(await runner(input.input, 80)).to.equal(5934);
		});
	});
});