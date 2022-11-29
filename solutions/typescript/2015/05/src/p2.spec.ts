import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { isNice, runner } from './p2.js';

describe('2015 - Day 5 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(await runner(input.input)).to.equal(51);
	});

	it('should true that example 1 is nice', async () => {
		expect(isNice('qjhvhtzxzqqjkmpb')).to.equal(true);
	});

	it('should true that example 2 is nice', async () => {
		expect(isNice('xxyxx')).to.equal(true);
	});

	it('should true that example 3 is naughty', async () => {
		expect(isNice('uurcxstgmygtbstg')).to.equal(false);
	});

	it('should true that example 4 is naughty', async () => {
		expect(isNice('ieodomkazucvgmuy')).to.equal(false);
	});
});